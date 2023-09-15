import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isOpenNavPanel }) {
  return (
    <div className={`navigation ${isOpenNavPanel ? 'navigation_active' : ''}`}>
      <nav className='navigation__list'>
        <ul className='navigation__list-movies'>
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
        <ul className='navigation__list-account'>
          <li className='navigation__item navigation__item_type_account'>
            <Link to="/profile" className="navigation__profile navigation__link">
              Аккаунт
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation;
