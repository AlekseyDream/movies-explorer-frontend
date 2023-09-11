import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from '../Header/Header'
import './Profile.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Profile({ logOut, onUpdateInfo, loggedIn, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, handleChange, isValid, resetForm } = useFormWithValidation();
  const [isLastEnter, setIsLastEnter] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateInfo({
      name: values.name,
      email: values.email,
    });
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsLastEnter(true);
    } else {
      setIsLastEnter(false);
    }
  }, [values]);

  return (
    <>
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <main className="profile">
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <div className="profile__labels-container">
            <label className="profile__label">
              <div className="profile__input-block">
                <span className="profile__label-text">Имя</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Ваше имя"
                  className={`profile__input ${errors.name && 'profile__input_error'
                    }`}
                  value={values.name || ''}
                  onChange={handleChange}
                  minLength="2"
                  maxLength="30"
                  pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                  required
                />
              </div>
              <span className="profile__error-name">{errors.name || ''}</span>
            </label>
            <label className="profile__label">
              <div className="profile__input-block">
                <span className="profile__label-text">E-mail</span>
                <input
                  name="email"
                  type="email"
                  placeholder="Ваш email"
                  className={`profile__input ${errors.email && 'profile__input_error'
                    }`}
                  value={values.email || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <span className="profile__error">{errors.email || ''}</span>
            </label>
          </div>
          <div className="profile__button-container">
            <button
              type="submit"
              className={`profile__button-edit ${!isValid && 'profile__button-edit_disabled'
                }`}
                disabled={!isValid  || isLastEnter || isLoading}
              onClick={handleSubmit}
            >
              Редактировать
            </button>
            <a href="/signin" className="profile__link-exit" onClick={logOut}>
              Выйти из аккаунта
            </a>
          </div>
        </form>
      </main>
    </>
  );
}

export default Profile;