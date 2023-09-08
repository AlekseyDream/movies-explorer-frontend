import React from 'react';
import './MoviesCard.css';
import { CARDS_IMAGE_BASE_URL } from '../../config/config'

function MoviesCard({ card, savedCard, onSaveMovie, onDeleteMovie, isSavedFilms, savedMovies }) {
  const cardSaveButtonClassName = (
    `movies-card__button movies-card__button_type_unsave ${savedCard ? "movies-card__button_active" : ""}`
  );

  function handleCardClick() {
    if (savedCard) {
      onDeleteMovie(savedMovies.filter((movie) => movie.movieId === card.id)[0]);
    } else {
      onSaveMovie(card);
    }
  }

  function handleCardDelete() {
    onDeleteMovie(card);
  }

  function convertDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <>
      <li className="movies-card">
        <article className="movies-card__item" id={card._id}>
          <a href={card.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="movies-card__image"
              src={isSavedFilms ? card.image : `https://api.nomoreparties.co/${card.image.url}`}
              alt={`Картинка превью фильма: ${card.nameRU}`} />
          </a>
        </article>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{card.nameRU}</h2>
          {isSavedFilms ? (
            <label className="movies-card__label">
              <input
                className="movies-card__input"
                type="checkbox"
              />
              <span className="movies-card__like"></span>
              <button
                type="button"
                className="movies-card__like"
                onClick={handleCardClick}>
              </button>
            </label>
          ) : (
            <button
              type="button"
              className={cardSaveButtonClassName}
              aria-label="Удалить фильм из сохранённых"
              title="Удалить фильм из сохранённых"
              onClick={handleCardDelete}
            ></button>
          )}
        </div>
        <span className="movies-card__duration">{convertDuration(card.duration)}</span>
      </li>
    </>
  );
};

export default MoviesCard;