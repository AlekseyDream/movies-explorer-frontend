import './FilterCheckbox.css'

function SearchShort({checkHandler, isChecked}) {
  return (
    <label className="search__checkbox">
    <input
      type="checkbox" name="short" id="search-short-toggle"
      className="search__label"
      checked={isChecked}
      onChange={checkHandler}
       />
    <label
      className="search__checkbox-label"
      htmlFor="search-short-toggle" />
    <p className="search__text">
      Короткометражки
    </p>
  </label>
  )
}

export default SearchShort;
