import Header from '../Header/Header.jsx';
import Search from '../Search/Search.jsx';
import Footer from '../Footer/Footer.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { useEffect, useState } from 'react';
import api from '../../utils/MainApi.js';
import './SavedMovies.css';

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

function SavedMovies({loggedIn}) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [parameters, setParameters] = useState({ querry: '', includeShorts: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
  setIsLoading(true);
    api.getSavedMovies()
      .then(res => {
        console.log(res);
        setSavedMovies(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [setSavedMovies])



  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const { request, short } = e.target.elements;
    console.log(request.value, short.checked);
    const currentSearch = { querry: request.value, includeShorts: short.checked };
    setParameters(currentSearch);
    setIsNotFound(false);
  }

  useEffect(() => {
    const currentSearchedMovies = savedMovies.filter(movie => movieFilter(movie, parameters));
    if (currentSearchedMovies.length === 0) {
      setIsNotFound(true);
  } else {
      setIsNotFound(false);
      setSearchedSavedMovies(currentSearchedMovies);
  }
    console.log('currentSearchedMovies: ', currentSearchedMovies);
    setSearchedSavedMovies(currentSearchedMovies);
  }, [parameters, savedMovies])


  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <Search parameters={parameters}
         handleSearchSubmit={handleSearchSubmit}
        setParameters={setParameters} />
      <MoviesCardList
      moviesData={searchedSavedMovies}
      isLoading={isLoading}
      isNotFound={isNotFound}  />
      <div className="saved-movies__saveddevider" aria-label="Секция отделяющая карточки от Footer"></div>
      <Footer />
    </div>
  )
}

export default SavedMovies;





