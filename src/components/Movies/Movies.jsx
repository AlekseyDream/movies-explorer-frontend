import { useEffect, useState } from 'react';
import { useSavedMoviesContext } from '../../context/SavedMovieContextProvider.js';
import Search from '../Search/Search.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import api from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi.js';
import './Movies.css'
import {
  MIN_BIG_SCREEN_SIZE,
  MAX_MEDIUM_SCREEN_SIZE,
  MIN_MEDIUM_SCREEN_SIZE,
  MAX_SMALL_SCREEN_SIZE,
  CARDS_QUANTITY_DECKTOP,
  CARDS_QUANTITY_TABLET,
  CARDS_QUANTITY_MOBILE,
  CARDS_MORE_DECKTOP,
  CARDS_MORE_MOBILE,
  NOTHING_FOUND,
  MOVIES_SERVER_ERROR
} from "../../utils/config.js";


const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
  return (isShortsIncluded && (movieDuration <= shortsDurationCriteria)) || (!isShortsIncluded && (movieDuration > shortsDurationCriteria));
}

const filterMovieByQuerry = (movie, searchQuerry) => {
  const lowerQuerry = searchQuerry.toLowerCase();
  return movie.nameRU.toLowerCase().includes(lowerQuerry);
}

export const movieFilter = (movie, { querry, includeShorts }) => {
  return (includeShorts && (movie.duration <= 40) && filterMovieByQuerry(movie, querry)) ||
    (!includeShorts && filterMovieByQuerry(movie, querry));
}


const Movies = ({ loggedIn }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [prevSearchResults, setPrevSearchResults] = useState([]);
  const [moviesDisplayed, setMoviesDisplayed] = useState([]);
  const [amountOfCards, setAmountOfCards] = useState(getAmountOfCards());
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { setSavedMovies } = useSavedMoviesContext();
  const [parameters, setParameters] = useState({ querry: '', includeShorts: false });
  const [serachedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [shownMoviesQuantity, setShownMoviesQuantity] = useState(0);


  const getAmountOfCards = () => {
    const display = window.innerWidth;
    if (display > MIN_BIG_SCREEN_SIZE) {
      setShownMoviesQuantity(CARDS_QUANTITY_DECKTOP);
    } else if (display > MIN_MEDIUM_SCREEN_SIZE && display < MAX_MEDIUM_SCREEN_SIZE) {
      setShownMoviesQuantity(CARDS_QUANTITY_TABLET);
    } else if (display < MAX_SMALL_SCREEN_SIZE) {
      setShownMoviesQuantity(CARDS_QUANTITY_MOBILE);
    }
  }

  useEffect(() => {
    getAmountOfCards();
}, []);

  useEffect(() => {
    const search = JSON.parse(localStorage.getItem('search'));
    if (search) setParameters(search);

    const prevResults = JSON.parse(localStorage.getItem('prevSearchResults'));
    if (prevResults) setSearchedMovies(prevResults);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [setSavedMovies])

  useEffect(() => {
    const search = JSON.parse(localStorage.getItem('search'));
    if (search) setParameters(search);

    const movieStorage = JSON.parse(localStorage.getItem('movies'));
    if (movieStorage) {
      setAllMovies(movieStorage)
      return;
    }

    moviesApi.getMovies()
      .then(movies => {
        setAllMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch(err => {
        console.error(err);
        setIsNotFound(true)
      })
  }, [])

  useEffect(() => {
    setIsButtonVisible(moviesDisplayed.length < serachedMovies.length);
  }, [moviesDisplayed, serachedMovies])

  const handleMoreMovies = () => {
    const moviesToShow = allMovies.slice(moviesDisplayed.length, moviesDisplayed.length + amountOfCards.extraCards);
    setMoviesDisplayed([...moviesDisplayed, ...moviesToShow]);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const { request, short } = e.target.elements;

    const currentSearch = {
      querry: request.value,
      includeShorts: short.checked,
    };

    localStorage.setItem('search', JSON.stringify(currentSearch));
    localStorage.setItem('prevSearchResults', JSON.stringify(serachedMovies));

    setParameters(currentSearch);
    setPrevSearchResults(serachedMovies);
    setIsNotFound(false);
  }

  useEffect(() => {
    if (!parameters.querry) return;
    const currentSearchedMovies = allMovies.filter(movie => movieFilter(movie, parameters));
    if (currentSearchedMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
      setSearchedMovies(currentSearchedMovies);
    }
    console.log('currentSearchedMovies: ', currentSearchedMovies);
    setSearchedMovies(currentSearchedMovies);

  }, [parameters, allMovies])

  return (
    <div>
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <main className="movies__container">

        <Search
          parameters={parameters}
          handleSearchSubmit={handleSearchSubmit}
          setParameters={setParameters}
        />
        <MoviesCardList
          isLoading={isLoading}
          moviesData={moviesDisplayed}
          isNotFound={isNotFound} />
        {isButtonVisible
          ?
          <button className="movies-card__more-button"
            type="button" onClick={handleMoreMovies}>
            Ещё
          </button>
          : null
        }
      </main>
      <Footer />
    </div>
  )
};

export default Movies;
