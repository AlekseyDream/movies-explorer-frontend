import './Header.css';
import Logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Header = ({ isLoggedIn, logIn }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isMobile = useMediaQuery({ query: `(max-width: 770px)` });

  return (
    <header
      className={`header header_theme_${isLanding ? 'mazarine' : 'dark'
        }`}
    >
      <div className="header__container">
        <Link to="/" className="header__link">
          <img className="header__logo" src={Logo} alt="Логотип"/>
        </Link>
        {isMobile ? (
          <BurgerMenu />
        ) : (
          <Navigation
            isLoggedIn={isLoggedIn}
            logIn={logIn}
          />
        )}
      </div>
    </header>
  );
};

export default Header;