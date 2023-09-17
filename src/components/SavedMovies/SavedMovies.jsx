import Header from '../Header/Header.jsx';
import Search from '../Search/Search.jsx';
import Footer from '../Footer/Footer.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { useEffect, useState } from 'react';
import api from '../../utils/MainApi.js';
import './SavedMovies.css';
import { SHORT_MOVIE_DURATION } from '../../utils/constants.js';

function SavedMovies({loggedIn}) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [isShortChecked, setIsShortChecked] = useState(false)
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
  setIsLoading(true);
    api.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
        setSearchedSavedMovies(res)
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])


  const searchAndToggleHandler = () => {
    const isShortMovies = isShortChecked
    ? savedMovies.filter((movie) => movie.duration < SHORT_MOVIE_DURATION)
    : savedMovies
    const list = isShortMovies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
    );
    setIsNotFound(false)
    if (list.length === 0 && searchValue) {
      setIsNotFound(true)
    }
    return setSearchedSavedMovies(list)
  }
  // хедпер который предотвратить асинхронную работу useState
  useEffect(() => {
    searchAndToggleHandler()
  }, [isShortChecked])

  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <Search 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isShortChecked={isShortChecked}
        setIsShortChecked={setIsShortChecked}
        searchAndToggleHandler={searchAndToggleHandler}
        isLoading={isLoading}
      />
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





