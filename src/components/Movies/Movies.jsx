import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as moviesApi from '../../utils/MoviesApi';
import { filterMovies, filterDuration } from '../../utils/MoviesFilter';

function Movies({ savedMovies, onSaveMovie, onDeleteMovie }) {
  
    const [isLoading, setIsLoading] = useState(false);
    const [initialMovies, setInitialMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isCheckboxActive, setIsCheckboxActive] = useState(false);
    const [isRequestError, setIsRequestError] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);


    function getFilterMovies(movies, searchQuery, isCheckbox) {

        const moviesList = filterMovies(movies, searchQuery, isCheckbox);
        setInitialMovies(moviesList);
  
        setFilteredMovies(isCheckbox ? filterDuration(moviesList) : moviesList);
        localStorage.setItem('movies', JSON.stringify(moviesList));
        localStorage.setItem('allMovies', JSON.stringify(movies));
    }

    function handleFilterCheckbox() {
        setIsCheckboxActive(!isCheckboxActive);
        if (!isCheckboxActive) {
            if (filterDuration(initialMovies).length === 0) {
                setFilteredMovies(filterDuration(initialMovies));
            } else {
                setFilteredMovies(filterDuration(initialMovies));
            }
        } else {
            setFilteredMovies(initialMovies);
        }
        localStorage.setItem('shortMovies', !isCheckboxActive);
    }

    function handleSearchMovies(searchQuery) {
        localStorage.setItem('movieSearch', searchQuery);
        localStorage.setItem('shortMovies', isCheckboxActive);
        if (localStorage.getItem('allMovies')) {
            console.log('Показываем фильмы из загруженных с сервера');
            const movies = JSON.parse(localStorage.getItem('allMovies'));
            getFilterMovies(movies, searchQuery, isCheckboxActive);
        } else {
            console.log('Загружаем фильмы с сервера');
            setIsLoading(true);
            moviesApi.getMovies()
                .then((cardsData) => {
                    getFilterMovies(cardsData, searchQuery, isCheckboxActive);
                    setIsRequestError(false);
                })
                .catch((err) => {
                    setIsRequestError(true);
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    useEffect(() => {
        if (localStorage.getItem('shortMovies') === 'true') {
            setIsCheckboxActive(true);
        } else {
            setIsCheckboxActive(false);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('movies')) {
            const movies = JSON.parse(localStorage.getItem('movies'));
            setInitialMovies(movies);
            if (localStorage.getItem('shortMovies') === 'true') {
                setFilteredMovies(filterDuration(movies));
            } else {
                setFilteredMovies(movies);
            }
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('movieSearch')) {
            if (filteredMovies.length === 0) {
                setIsNotFound(true);
            } else {
                setIsNotFound(false);
            }
        } else {
            setIsNotFound(false);
        }
    }, [filteredMovies]);

    return (
        <main className="content page__content">
            <SearchForm
                onSearch={handleSearchMovies}
                onFilter={handleFilterCheckbox}
                isCheckboxActive={isCheckboxActive}
            />
            <MoviesCardList
                savedMovies={savedMovies}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                filteredMovies={filteredMovies}
                isSavedFilms={false}
                isRequestError={isRequestError}
                isNotFound={isNotFound}
                isLoading={isLoading}
            />
        </main>
    );
}

export default Movies;