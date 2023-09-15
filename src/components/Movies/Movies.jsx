import { useEffect, useState } from 'react';
import { useSavedMoviesContext } from '../../context/SavedMovieContextProvider';
import Search from '../Search/Search';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import './Movies.css'

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

const getAmountOfCards = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 550) {
    return { totalCards: 5, extraCards: 2 };
  } else if (screenWidth <= 750) {
    return { totalCards: 8, extraCards: 2 };
  }
  return { totalCards: 16, extraCards: 4 };
}

const Movies = ({ loggedIn }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [prevSearchResults, setPrevSearchResults] = useState([]);
  const [moviesDisplayed, setMoviesDisplayed] = useState([]);
  const [amountOfCards, setAmountOfCards] = useState(getAmountOfCards());
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const {setSavedMovies} = useSavedMoviesContext();
  const [parameters, setParameters] = useState({ querry: '', includeShorts: false });
  const [serachedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

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
    if (localStorage.getItem('search')) {
      setMoviesDisplayed(serachedMovies.slice(0, amountOfCards.totalCards));

    } else {
      setMoviesDisplayed(allMovies.slice(0, amountOfCards.totalCards));

    }
  }, [amountOfCards, serachedMovies, allMovies]);

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
          <button className="movies-card__more-button"
            type="button" onClick={handleMoreMovies}>
            Ещё
          </button>
      </main>
      <Footer />
    </div>
  )
};

export default Movies;
