import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = ({ isLoggedIn, logIn }) => {
  return (
    <>
      {!isLoggedIn ? (
        <nav className="navigation">
          <ul className="navigation navigation__links-login">
            <li className="navigation__link-text">
            <Link
            to="/signup"
            className="navigation__link"
          >
            Регистрация
          </Link>
            </li>
            <li className="navigation__link-text">
            <Link
            to="/signin"
            className="navigation__link navigation__link_type_active"
            onClick={logIn}
          >
            Войти
          </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navigation">
          <ul className="navigation__links-movies">
            <li className="navigation__link-text">
            <Link
              to="/movies"
              className="navigation__link navigation__link_type_film"
            >
              Фильмы
            </Link>
            </li>
            <li className="navigation__link-text">
            <Link
              to="/saved-movies"
              className="navigation__link navigation__link_type_save-film"
            >
              Сохранённые фильмы
            </Link>
              </li>
          </ul>
          <ul className="navigation__links-account">
            <li className="navigation__link-text">
            <Link
              to="/profile"
              className="navigation__link navigation__link_type_account"
            >
              Аккаунт
            </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;