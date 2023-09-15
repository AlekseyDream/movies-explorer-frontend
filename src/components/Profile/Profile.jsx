import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import useFormWithValidation from '../../hooks/useFormWithValidation.jsx';
import Header from '../Header/Header.jsx';
import './Profile.css';

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
    <div className="">
      <Header loggedIn={loggedIn} theme={{ default: false }} />
      <main className="profile">
        <h2 className="profile__title">
          {`Привет, ${currentUser.name}!`}
        </h2>

        <form name="profile__form"
          className="profile__form"
          onSubmit={handleSubmit}>
          <label className="profile__input-container">
            <span className="profile__input-label">
              Имя
            </span>
            <input
              name="name"
              type="text"
              className="profile__input"
              placeholder="Имя"
              value={values.name || ''}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required={true} />
          </label>
          <span className="auth-form__span-error">{errors.name}</span>
          <label className="profile__input-container">
            <span className="profile__input-label">
              E-mail
            </span>
            <input
              required
              type="email"
              name="email"
              pattern="^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$"
              className="profile__input"
              placeholder="почтa"
              value={values.email || ''}
              onChange={handleChange}
            />
          </label>
          <span className="auth-form__span-error">{errors.email}</span>
        <div className="profile__edit">
          <button
          onClick={handleSubmit}
            type="button"
            form="profile__form"
            disabled={!isValid  || isLastEnter || isLoading}
            className={!isValid  || isLastEnter || isLoading
              ?'profile__button-edit profile__button-edit_inactive'
              :'profile__button-edit' }>
            Редактировать
          </button>
          <button
            className="profile__button-logout"
            type="button"
            onClick={logOut}>
            Выйти из аккаунта
          </button>
        </div>
        </form>
      </main>
    </div>
  )
};

export default Profile;
