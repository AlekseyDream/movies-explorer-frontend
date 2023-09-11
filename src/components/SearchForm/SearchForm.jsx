import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


const SearchForm = ({ parameters, setParameters, handleSearchSubmit }) => {
  const [searchValue, setSearchValue] = useState(parameters.querry);
  const [isShortChecked, setShortChecked] = useState(parameters.includeShorts);
  const [prevSearchResults, setPrevSearchResults] = useState([]);

  const {pathname} = useLocation();

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  }
  
  useEffect(() => {
    setSearchValue(parameters.querry);
    setShortChecked(parameters.includeShorts);
    if (pathname === '/movies' && parameters.querry !== '') {
        localStorage.setItem('search', JSON.stringify(parameters));
        console.log(localStorage.getItem('search'));
    }
  }, [parameters, pathname])


  const handleShortsCheck = () => {
    setShortChecked(!isShortChecked);
    setParameters({ ...parameters, includeShorts: !parameters.includeShorts });
  }

  return (
    <section className="search-container" aria-label="Форма поиска">
      <form
        className="search__form"
        name="search"
        onSubmit={handleSearchSubmit}
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
            onChange={handleChange}
            required
          />
          <span className="search__error"></span>
          <button className="search__button" type="submit">Найти</button>
        </div>
        <FilterCheckbox checkHandler={handleShortsCheck} isChecked={isShortChecked}/>
      </form>
    </section>
  );
};

export default SearchForm;