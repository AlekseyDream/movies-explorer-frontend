import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <form
      className="Checkbox__form"
      name="Checkbox"
      noValidate>
      <label
        className="checkbox"
        htmlFor="checkbox"
      >
        <input
          className="checkbox__input"
          type="checkbox"
          id="checkbox"
        />
        <span className="checkbox__inner">Короткометражки</span>
      </label>
    </form>
  );
};

export default FilterCheckbox;