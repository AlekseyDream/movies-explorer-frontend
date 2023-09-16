import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isOpenNavPanel }) {
  return (
    <div className={`navigation ${isOpenNavPanel ? 'navigation_active' : ''}`}>
      <nav className='navigation__list'>
        <ul className='navigation__list-movies'>
          <li className='navigation__item'>
            <NavLink to='/'
            className={({isActive}) => 'navigation__link navigation__link-home' + (isActive ? ' navigation__link_active' : '')}>
              Главная
            </NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink to='/movies'
            className={({isActive}) => 'navigation__link' + (isActive ? ' navigation__link_active' : '')}>
              Фильмы
            </NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink to='/saved-movies'
            className={({isActive}) => 'navigation__link' + (isActive ? ' navigation__link_active' : '')}>
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <ul className='navigation__list-account'>
          <li className='navigation__item navigation__item_type_account'>
            <NavLink to="/profile"
            className={({isActive}) => 'navigation__link navigation__profile' + (isActive ? ' navigation__link_active' : '')}>
              Аккаунт
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation;
