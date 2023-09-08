import React from 'react';
import { useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { filterMovies, filterDuration } from '../../utils/MoviesFilter';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function onSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsCheckboxActive(!isCheckboxActive);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(isCheckboxActive ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isCheckboxActive, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <section className="saved-movies">
      <SearchForm onSearch={onSearchMovies} onFilter={handleShortMovies} />
      <MoviesCardList
        savedMovies={savedMovies}
        isNotFound={isNotFound}
        isSavedFilms={true}
        filteredMovies={filteredMovies}
        onDeleteMovie={onDeleteMovie}
      />
      <div className="saved-movies__saveddevider" aria-label="Секция отделяющая карточки от Footer"></div>
    </section>
  );
};

export default SavedMovies;