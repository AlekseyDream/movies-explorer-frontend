import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css';
import useFormWithValidation from '../../components/hooks/useFormWithValidation';

const Profile = ({ logOut, onUpdate, editSubmitTitle, isLoading }) => {
  const [isDisabled, setIsDisabled] = useState(true);
    const currentUser = useContext(CurrentUserContext);

    const { enteredValues, errors, handleChange, isFormValid, resetForm } = useFormWithValidation();

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isEqualValues, setEqualValues] = useState(true);

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        }
    }, [currentUser, resetForm]);

    function handleSubmit(e) {
        e.preventDefault();

        let newUserName = "";
        let newUserEmail = "";

        enteredValues.name ? newUserName = enteredValues.name : newUserName = currentUser.name;
        enteredValues.email ? newUserEmail = enteredValues.email : newUserEmail = currentUser.email;

        if (!isEqualValues) {
            onUpdate({
                name: newUserName,
                email: newUserEmail,
            });
            resetForm();
        }

        setIsDisabled(true);
    }

    useEffect(() => {
        let name = true;
        let email = true;
        if (enteredValues.name) {
            name = enteredValues.name === currentUser.name;
        }
        if (enteredValues.email) {
            email = enteredValues.email === currentUser.email;
        }
        setEqualValues(name && email);
    }, [enteredValues.name, enteredValues.email]);

    useEffect(() => {
        if (!isLoading) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser, isLoading]);

    useEffect(() => {
        if (enteredValues.name) {
            setName(enteredValues.name);
        }
        if (enteredValues.email) {
            setEmail(enteredValues.email);
        }
    }, [enteredValues.name, enteredValues.email]);


    const profileLabelClassName = (
        `profile__text ${isDisabled ? "profile__text_disabled" : ""}`
    );

    const profileSubmitButtonClassName = (
        `profile__submit-button submit-button ${isDisabled ? "profile__submit-button_disabled" : ""} ${!isFormValid || isLoading || isEqualValues ? "submit-button_inactive" : ""}`
    );

    function handleEditButtonClick() {
        enteredValues.name = currentUser.name;
        enteredValues.email = currentUser.email;
        setIsDisabled(!isDisabled);
    }

  return (
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
                value={`${enteredValues.name ? enteredValues.name : name}`}
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
                value={`${enteredValues.email ? enteredValues.email : email}`}
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
            className={`profile__button-edit ${!isFormValid && 'profile__button-edit_disabled'
              }`}
            disabled={!isFormValid ? true : false}
            onClick={handleEditButtonClick}
          >
            Редактировать
          </button>
          <a href="/signin" className="profile__link-exit" onClick={logOut}>
            Выйти из аккаунта
          </a>
        </div>
      </form>
    </main>
  );
}

export default Profile;