import './Register.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useFormWithValidation from '../../components/hooks/useFormWithValidation';
import logo from '../../images/logo.svg';

const Register = ({ register }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    register(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="register">
      <form
        className="register__form"
        name="register"
        noValidate
        onSubmit={handleSubmit}
      >
        <Link
          to="/"
          className="register__link"
        >
          <img
            src={logo}
            alt="Логотип"
            className="register__logo"
          />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__labels-container">
          <label className="register__label">
            <span className="register__label-text">Имя</span>
            <input
              name="name"
              type="text"
              placeholder="Ваше имя"
              className={`register__input ${errors.name && 'register__input_error'
                }`}
              onChange={handleChange}
              value={values.name || ''}
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              required
            />
            <span className="register__error">{errors.name || ''}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">E-mail</span>
            <input
              name="email"
              type="email"
              placeholder="Ваш email"
              className={`register__input ${errors.email && 'register__input_error'
                }`}
              onChange={handleChange}
              value={values.email || ''}
              required
            />
            <span className="register__error">{errors.email || ''}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              name="password"
              type="password"
              placeholder="Ваш пароль"
              minLength="2"
              maxLength="30"
              className={`register__input ${errors.password && 'register__input_error'
                }`}
              onChange={handleChange}
              value={values.password || ''}
              required
            />
            <span className="register__error">{errors.password || ''}</span>
          </label>
          <div className="register__footer">
          <button
            type="submit"
            className={`register__button ${!isValid && 'register__button_disabled'
              }`}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
          <span className="register__support">
            Уже зарегистрированы?&nbsp;
            <Link
              to="/signin"
              className="register__link"
              onClick={register}
            >
              Войти
            </Link>
          </span>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Register;