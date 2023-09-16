import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import './Header.css';

function Header({ theme, loggedIn }) {
  const [openNavPanel, setOpenNavPanel] = useState(false);

  function handleOpenNavPanel() {
    setOpenNavPanel(!openNavPanel);
  }

  const { pathname } = useLocation();

  return (
    <header className={pathname === "/" ? "header header_type_promo" : "header"}>
      {!theme.default && (loggedIn ?
        <div className="header__container">
          <NavLink to="/" className="header__logo" />
          <div className={`header__overlay ${openNavPanel ? 'header__overlay_active' : ''}`} />
          <button
            className="header__navpanel"
            onClick={handleOpenNavPanel}>
            <div className={`header__navpanel-inner ${openNavPanel ? 'header__navpanel-inner_active' : ''}`} />
          </button>
          <Navigation isOpenNavPanel={openNavPanel} />
        </div>
        :
        <div className="header__container header__main">
          <ul className='header__list-logo'>
            <li className='header__item'>
            <NavLink to="/" className="header__logo" />
            </li>
          </ul>
          <ul className='header__list-login'>
            <li className='header__item'>
            <NavLink to="/signup"
            className={({isActive}) => 'header__signup' + (isActive ? ' header__signup_active' : '')}>
            Регистрация
          </NavLink>
            </li>
            <li className='header__item'>
            <NavLink to="/signin"
            className={({isActive}) => 'header__signin' + (isActive ? ' header__signin_active' : '')}>
            Войти
          </NavLink>
            </li>
          </ul>
        </div>
      )
      }
    </header>
  )
}

export default Header;

