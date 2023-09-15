import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './Search.css';

function Search({ parameters, setParameters, handleSearchSubmit }) {
  const [searchValue, setSearchValue] = useState(parameters.querry);
  const [isShortChecked, setShortChecked] = useState(parameters.includeShorts);
  const [prevSearchResults, setPrevSearchResults] = useState([]);

  const { pathname } = useLocation();

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
  }, [parameters])


  const handleShortsCheck = () => {
    setShortChecked(!isShortChecked);
    setParameters({ ...parameters, includeShorts: !parameters.includeShorts });
  }

  return (
    <section className="movies">
      <section className="search-container">
        <form
          className="search__form"
          onSubmit={handleSearchSubmit}
          noValidate
        >
          <div className="search__input-block">
            <input
              type="text"
              name="request"
              placeholder="Фильм"
              onChange={handleChange}
              value={searchValue}
              className="search__input-box"
              required />
            <button className="search__button" type='submit'>Найти</button>
          </div>
          <FilterCheckbox checkHandler={handleShortsCheck} isChecked={isShortChecked} />
        </form>
      </section>
    </section>
  )
}

export default Search
