import './Header.css';
import Logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header header_theme">
      <div className="header__container">
        <Link
          to="/"
          className="header__link"
        >
          <img
            src={Logo}
            alt="Логотип"
          />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;