import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ moviesData, isLoading, isNotFound }) => {
  const { pathname } = useLocation();
  function SearchError({ errorText }) {
    return <p className="movies-cards__error">{errorText}</p>;
}
  return (
    <section className="movies-cards" aria-label="Карточки фильмов">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />}
      <ul className="movies-cards__list">
        {moviesData.map(movie => {
          return (
            <MoviesCard
              key={
                pathname === "/movies"
                  ? movie.id
                  : movie._id
              } movieData={movie}
            />
          )
        }
        )}
      </ul>
      <div className="movies-cards__saveddevider" aria-label="Секция отделяющая карточки от Footer"></div>
    </section >
  )
};

export default MoviesCardList;