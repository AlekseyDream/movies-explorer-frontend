import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSavedMoviesContext } from '../../contexts/SavedMovieContext';
import * as MainApi from '../../utils/MainApi';
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
  const buttonModificator = typeClass ? 'movies-card__button_type_unsave' : '';

  return (
    <button
      className={`movies-card__button ${buttonModificator}`}
      type="button"
      onClick={onClickHandler}
    >
      {typeClass ? '' : children}
    </button>
  )
};

function MoviesCard({ movieData }) {
  const { pathname } = useLocation();
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [isDeleted, setIsDeleted] = useState(false);
  const moviesUrl = 'https://api.nomoreparties.co/';

  useEffect(() => {
    setIsMovieSaved(savedMovies.some(movie => movie.movieId === movieData.id || movie.movieId === movieData.movieId));
  }, [savedMovies, movieData])

  const deleteMovie = () => {
    const deleteParam = pathname === '/movies'
      ? movieData.id
      : movieData.movieId;

    const movieToDelete = savedMovies.find(movie => movie.movieId === deleteParam);
    const movieToDeleteIndex = savedMovies.findIndex(movie => movie.movieId === deleteParam);

    MainApi.deleteSavedMovie(movieToDelete._id)
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
    MainApi.NewSavedMovie(savingMovieInfo)
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

  const convertDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <>
      <li className="movies-card">
        <article className="movies-card__item" id={movieData._id}>
          <a href={movieData.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="movies-card__image"
              src={pathname === "/movies"
                ? `${moviesUrl}/${movieData.image.url}`
                : movieData.image}
              alt={`Картинка превью фильма: ${movieData.nameRU}`} />
          </a>
        </article>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{movieData.nameRU}</h2>
            <label className="movies-card__label">
              <input
                className="movies-card__input"
                type="checkbox"
              />
              <span className="movies-card__like"></span>
              <MovieButton
                onClickHandler={isMovieSaved ? deleteMovie : saveMovie}
                typeClass={isMovieSaved && pathname === "/movies"}>
                  {pathname === "/movies" ? 'Сохранить' : ''} 
              </MovieButton>
            </label>
        </div>
        <span className="movies-card__duration">{convertDuration(movieData.duration)}</span>
      </li>
    </>
  );
};

export default MoviesCard;