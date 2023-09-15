import { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/" className="header__logo" />
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
            <Link to="/" className="header__logo" />
            </li>
          </ul>
          <ul className='header__list-login'>
            <li className='header__item'>
            <Link to="/signup" className="header__signup">
            Регистрация
          </Link>
            </li>
            <li className='header__item'>
            <Link to="/signin" className="header__signin">
            Войти
          </Link>
            </li>
          </ul>
        </div>
      )
      }
    </header>
  )
}

export default Header;

