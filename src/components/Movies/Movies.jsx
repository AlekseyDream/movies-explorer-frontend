import { useEffect, useState } from "react";
import { useSavedMoviesContext } from "../../context/SavedMovieContextProvider.js";
import Search from "../Search/Search.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import api from "../../utils/MainApi.js";
import moviesApi from "../../utils/MoviesApi.js";
import "./Movies.css";
import {
  BIG_SCREEN_SIZE,
  MEDIUM_SCREEN_SIZE,
  SHORT_MOVIE_DURATION,
  CARDS_QUANTITY_DECKTOP,
  CARDS_QUANTITY_TABLET,
  CARDS_QUANTITY_MOBILE,
  MORE_THAN_MEDIUM_SCREEN_SIZE,
  CARDS_QUANTITY_MORE_THAN_TABLET,
} from "../../utils/constants.js";
import { useWindowSize } from "../../hooks/useWindowSize.jsx";

const Movies = ({ loggedIn }) => {
  const { width: screenWidth } = useWindowSize();
  const [shownMoviesQuantity, setShownMoviesQuantity] = useState(0);
  const [prevSearchResults, setPrevSearchResults] = useState([]);
  const [moviesDisplayed, setMoviesDisplayed] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const { setSavedMovies } = useSavedMoviesContext();
  const [searchValue, setSearchValue] = useState("");
  const [isShortChecked, setIsShortChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const handlerCardAmount = () => {
    if (screenWidth >= BIG_SCREEN_SIZE) {
      return setShownMoviesQuantity(CARDS_QUANTITY_DECKTOP);
    }
    if (screenWidth < BIG_SCREEN_SIZE && screenWidth >= MORE_THAN_MEDIUM_SCREEN_SIZE) {
      return setShownMoviesQuantity(CARDS_QUANTITY_MORE_THAN_TABLET);
    }
    if (screenWidth < MORE_THAN_MEDIUM_SCREEN_SIZE && screenWidth >= MEDIUM_SCREEN_SIZE) {
      return setShownMoviesQuantity(CARDS_QUANTITY_TABLET);
    }
    if (screenWidth < MEDIUM_SCREEN_SIZE) {
      return setShownMoviesQuantity(CARDS_QUANTITY_MOBILE);
    }
  }

  //! screen wiidth
  useEffect(() => {
    handlerCardAmount()
  }, [screenWidth]);

  useEffect(() => {
    setIsLoading(true);
    api
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setSavedMovies]);


  const handleMoreMovies = () => {
    if (screenWidth >= BIG_SCREEN_SIZE) {
      setShownMoviesQuantity((prev) => prev + 4);
    } else if (screenWidth < BIG_SCREEN_SIZE && screenWidth >= MORE_THAN_MEDIUM_SCREEN_SIZE) {
      setShownMoviesQuantity((prev) => prev + 3);
    } else {
      setShownMoviesQuantity((prev) => prev + 2);
    }
  };

  // при монтировании компонента мы проверяяем есть ли данные в localStorage
  useEffect(() => {
    const isInLocalSearch = localStorage.getItem("searchQuery");
    const isInLocalToggle = localStorage.getItem("toggleQuery");
    const isInLocalMovies = localStorage.getItem("moviesDisplayed");

    if (isInLocalSearch !== null) setSearchValue(isInLocalSearch);
    if (isInLocalToggle !== null) setIsShortChecked(JSON.parse(isInLocalToggle));
    if (isInLocalMovies !== null) setMoviesDisplayed(JSON.parse(isInLocalMovies));
  }, []);

  // эта функция отавечает за поиск и фильтрацию
  const searchAndToggleHandler = async () => {
    setIsLoading(true)
    const getToggleFromLocal = JSON.parse(localStorage.getItem("toggleQuery"));
    localStorage.setItem("searchQuery", searchValue);
    handlerCardAmount()
    if (prevSearchResults.length === 0) {
      const firstFetch = await moviesApi.getMovies();
      setPrevSearchResults(firstFetch);
      localStorage.setItem("prevSearchFilms", JSON.stringify(firstFetch));
      const isShortMovies = durationFilms(getToggleFromLocal, firstFetch)
      const filteredFilms = filterFilms(searchValue, isShortMovies);
      setMoviesDisplayed(filteredFilms);
      localStorage.setItem("moviesDisplayed", JSON.stringify(filteredFilms));
    } else {
      const isShortMovies = durationFilms(getToggleFromLocal, prevSearchResults)
      const filteredFilms = filterFilms(searchValue, isShortMovies);
      setMoviesDisplayed(filteredFilms);
      localStorage.setItem("moviesDisplayed", JSON.stringify(filteredFilms));
    }
    const amountOfFilms = JSON.parse(localStorage.getItem("moviesDisplayed"))
    setIsNotFound(false)
    if (amountOfFilms == 0) {
      setIsNotFound(true)
    }
    setIsLoading(false)
  };

//хелперы
  const durationFilms = (toggle, films) => {
    return toggle
    ? films.filter((movie) => movie.duration < SHORT_MOVIE_DURATION)
    : films;
  }

  const filterFilms = (query, filmsList) => {
    const list = filmsList.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );
    return list;
  };

  useEffect(() =>{
    if (moviesDisplayed.length > shownMoviesQuantity) {
      setIsButtonVisible(true)
    }
    else{
      setIsButtonVisible(false)
    }
  }, [moviesDisplayed, shownMoviesQuantity])
  return (
    <div>
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <main className="movies__container">
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setIsShortChecked={setIsShortChecked}
          isShortChecked={isShortChecked}
          isLoading={isLoading}
          searchAndToggleHandler={searchAndToggleHandler}
        />
        <MoviesCardList
          isLoading={isLoading}
          moviesData={moviesDisplayed}
          isNotFound={isNotFound}
          shownMoviesQuantity={shownMoviesQuantity}
        />
        {isButtonVisible && (
          <button
            className="movies-card__more-button"
            type="button"
            onClick={handleMoreMovies}
          >
            Ещё
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
