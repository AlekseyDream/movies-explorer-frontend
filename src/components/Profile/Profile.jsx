import './Profile.css';
import React from "react";
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../components/hooks/useFormWithValidation';

function Profile({ logOut }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  return (
    <section className="profile">
      <form
        className="profile__form"
        name="profile"
        noValidate
      >
        <h1 className="profile__title">Привет, Алексей!</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
          <div className="profile__input-block">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              placeholder="Ваше имя"
              className={`profile__input ${
                errors.name && 'profile__input_error'
              }`}
              onChange={handleChange}
              value={values.name || ''}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
            </div>
            <span className="profile__error-name">{errors.name || ''}</span>
          </label>
          <label className="profile__label">
          <div className="profile__input-block">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              placeholder="Ваш email"
              className={`profile__input ${
                errors.email && 'profile__input_error'
              }`}
              onChange={handleChange}
              value={values.email || ''}
              type="email"
              required
            />
            </div>
            <span className="profile__error">{errors.email || ''}</span>
          </label>
        </div>
        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit ${
              !isValid && 'profile__button-edit_disabled'
            }`}
            disabled={!isValid ? true : false}
          >
            Редактировать
          </button>
          <Link  to="/signin" className="profile__link-exit" onClick={logOut}>
            Выйти из аккаунта
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Profile;