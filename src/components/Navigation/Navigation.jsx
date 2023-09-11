import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isOpenNavPanel }) {
  return (
    <div className={`navigation ${isOpenNavPanel ? 'navigation_active' : ''}`}>
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <Link to='/' className='navigation__link navigation__link-home'>
            Главная
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to='/movies' className='navigation__link'>
            Фильмы
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to='/saved-movies' className='navigation__link'>
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
      <Link to="/profile" className="navigation__item navigation__profile navigation__link">
            Аккаунт
          </Link>

    </div>
  )
}

export default Navigation;