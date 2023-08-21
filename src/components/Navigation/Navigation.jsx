import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = ({ isLoggedIn, logIn }) => {
  return (
    <>
      {!isLoggedIn ? (
        <nav className="navigation navigation__links-login">
          <Link
            to="/signup"
            className="navigation__link"
          >
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__link navigation__link_type_active"
            onClick={logIn}
          >
            Войти
          </Link>
        </nav>
      ) : (
        <nav className="navigation">
          <div className="navigation__links-movies">
            <Link
              to="/movies"
              className="navigation__link navigation__link_type_film"
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className="navigation__link navigation__link_type_save-film"
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div className="navigation__links-account">
            <Link
              to="/profile"
              className="navigation__link navigation__link_type_account"
            >
              Аккаунт
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navigation;