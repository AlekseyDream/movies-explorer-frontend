import './SearchForm.css';
import useFormWithValidation from '../hooks/useFormWithValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  const { values, handleChange } = useFormWithValidation();
  return (
    <section className="search-container" aria-label="Форма поиска">
      <form
        className="search__form"
        name="search"
        noValidate
      >
        <div className="search__input-block">
        <input
          className="search__input-box"
          aria-label="Форма поиска"
          name="search"
          type="text"
          placeholder="Фильм"
          autoComplete="off"
          value={values.search || ''}
          onChange={handleChange}
          required
        />
        <span className="search__error"></span>
        <button className="search__button" type="button">Найти</button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
};

export default SearchForm;