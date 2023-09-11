import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ theme, loggedIn }) {
  const [openNavPanel, setOpenNavPanel] = useState(false);

  function handleOpenNavPanel() {
    setOpenNavPanel(!openNavPanel);
  }

  const { pathname } = useLocation();

  return (
    <header className={pathname === "/" ? "header header_type_promo" : "header"}>
      <Link to="/" className="header__logo" />
      {!theme.default && (loggedIn ?
        <div>
          <div className={`header__overlay ${openNavPanel ? 'header__overlay_active' : ''}`} />
          <button
            className="header__navpanel"
            onClick={handleOpenNavPanel}>
            <div className={`header__navpanel-inner ${openNavPanel ? 'header__navpanel-inner_active' : ''}`} />
          </button>
          <Navigation isOpenNavPanel={openNavPanel} />
        </div>
        :
        <div className="header__main">
          <Link to="/signup" className="header__signup">
            Регистрация
          </Link>
          <Link to="/signin" className="header__signin">
            Войти
          </Link>
        </div>
      )
      }

    </header>
  )
}

export default Header;