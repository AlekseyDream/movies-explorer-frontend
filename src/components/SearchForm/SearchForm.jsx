import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


const SearchForm = ({ onSearch, onFilter, isCheckboxActive }) => {
  const currentLocation = useLocation().pathname;
    const [searchValue, setSearchValue] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (currentLocation === '/movies' && localStorage.getItem('movieSearch')) {
            setSearchValue(localStorage.getItem('movieSearch'));
        }
    }, [currentLocation]);


    function changeSearch(e) {
        setSearchValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (searchValue.trim().length === 0) {
            setIsError(true);
        } else {
            setIsError(false);
            onSearch(searchValue);
        }
    }

  return (
    <section className="search-container" aria-label="Форма поиска">
      <form
        className="search__form"
        name="search"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search__input-block">
          <input
            name="search"
            type="text"
            className="search__input-box"
            aria-label="Форма поиска"
            placeholder="Фильм"
            autoComplete="off"
            value={searchValue || ""}
            onChange={changeSearch}
            required
          />
          <span className="search__error"></span>
          <button className="search__button" type="button">Найти</button>
        </div>
        <FilterCheckbox onFilter={onFilter} isActive={isCheckboxActive}/>
      </form>
    </section>
  );
};

export default SearchForm;