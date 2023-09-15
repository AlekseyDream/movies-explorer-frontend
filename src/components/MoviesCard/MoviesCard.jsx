import { useLocation } from 'react-router-dom';
import { convertMinutes } from '../../utils/СonvertMinutes.js';
import { useEffect, useState } from 'react';
import { useSavedMoviesContext } from '../../context/SavedMovieContextProvider.js';
import api from '../../utils/MainApi.js';
import './MoviesCard.css';

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

const MovieButton = ({ onClickHandler, typeClass, children }) => {
  const buttonModificator = typeClass ? 'movies-card__like' : 'movies-card__unlike';

  return (
    <button
      className={`movies-card__like ${buttonModificator}`}
      type="button"
      onClick={onClickHandler}
    >
      {typeClass ? '' : children}
    </button>
  )
};

const MovieDeleteButton = ({ onClickHandler, typeClass, children }) => {
  const buttonModificator = typeClass ? 'movies-card__button_type_unsave' : '';

  return (
    <button
      className={`movies-card__button_type_unsave ${buttonModificator}`}
      type="button"
      onClick={onClickHandler}
    >
      {typeClass ? '' : children}
    </button>
  )
};

function MoviesCard({ movieData }) {
  const { pathname } = useLocation();
  const path = useLocation().pathname;
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [isDeleted, setIsDeleted] = useState(false);
  const moviesUrl = 'https://api.nomoreparties.co/';

  useEffect(() => {
    setIsMovieSaved(savedMovies.some(movie => movie.movieId === movieData.id || movie.movieId === movieData.movieId));
  }, [savedMovies, movieData])

  function deleteMovie() {
    const deleteParam = pathname === '/movies'
      ? movieData.id
      : movieData.movieId;

    const movieToDelete = savedMovies.find(movie => movie.movieId === deleteParam);
    const movieToDeleteIndex = savedMovies.findIndex(movie => movie.movieId === deleteParam);

    api.deleteSavedMovie(movieToDelete._id)
      .then(movieData => {
        setSavedMovies(prevMovies => {
          const updatedMovies = [...prevMovies];
          updatedMovies.splice(movieToDeleteIndex, 1);
          return updatedMovies;
        });
        setIsDeleted(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    setIsDeleted(false);
  }, [movieData]);

  const saveMovie = () => {
    const savingMovieInfo = {
      ...movieData,
      movieId: movieData.id,
      image: `${moviesUrl}${movieData.image.url}`,
      thumbnail: `${moviesUrl}${movieData.image.formats.thumbnail.url}`,
    };
    delete savingMovieInfo.id;
    delete savingMovieInfo.created_at;
    delete savingMovieInfo.updated_at;
    api.NewSavedMovie(savingMovieInfo)
      .then(movie => {
        setSavedMovies([...savedMovies, movie]);
      })
      .catch(err => {
        console.log(err);
      })
  }
  if (isDeleted && pathname === "/saved-movies") {
    return null;
  }

  return (
    <>
      <li className="movies-card">
        <article className="movies-card__item">
          <a href={movieData.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="movies-card__image"
              src={pathname === "/movies"
                ? `${moviesUrl}/${movieData.image.url}`
                : movieData.image}
              alt={movieData.nameRU} />
          </a>
        </article>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{movieData.nameRU}</h2>
          <label className="movies-card__label">
            <input
              className="movies-card__input"
              type="checkbox"
            />
            {path === '/movies' ? (
              <MovieButton
                onClickHandler={isMovieSaved ? deleteMovie : saveMovie}
                typeClass={isMovieSaved && pathname === "/movies"}>
              </MovieButton>
            ) : (
              <MovieDeleteButton
                onClickHandler={deleteMovie}
                typeClass={isMovieSaved === "/movies"}
              ></MovieDeleteButton>
            )}
          </label>
        </div>
        <span className="movies-card__duration">{convertMinutes(+movieData.duration)}</span>
      </li>
    </>
  )
}

export default MoviesCard;
