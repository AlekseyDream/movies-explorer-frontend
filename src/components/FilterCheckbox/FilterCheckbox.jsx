import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ checkHandler, isChecked }) => {
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
          value="true"
          checked={isChecked}
          onChange={checkHandler}
        />
        <span className="checkbox__inner">Короткометражки</span>
      </label>
    </form>
  );
};

export default FilterCheckbox;