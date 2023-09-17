import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import "./Search.css";

function Search({
  searchValue,
  setSearchValue,
  isShortChecked,
  setIsShortChecked,
  searchAndToggleHandler,
  isSaved,
  isLoading
}) {
  const formSubmit = (e) => {
    e.preventDefault();
    searchAndToggleHandler();
  };

  const toggleShort = async () => {
    if (!isSaved) {
      localStorage.setItem("toggleQuery", !isShortChecked);
      setIsShortChecked(JSON.parse(localStorage.getItem("toggleQuery")));
      searchAndToggleHandler();
    }
    if (isSaved) {
      setIsShortChecked((prev) => !prev);
      searchAndToggleHandler();
    }
  };

  return (
    <section className="search-container">
      <form className="search__form" onSubmit={formSubmit} noValidate>
        <div className="search__input-block">
          <input
            type="text"
            name="request"
            placeholder="Фильм"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="search__input-box"
            required
          />
          <button className="search__button" type="submit" disabled={isLoading}>
            Найти
          </button>
        </div>
        <FilterCheckbox isChecked={isShortChecked} toggleShort={toggleShort} />
      </form>
    </section>
  );
}

export default Search;
