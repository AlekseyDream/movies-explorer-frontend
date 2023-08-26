import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className="footer__info">
          <p className="footer__info-data">© {new Date().getFullYear()}</p>
          <ul className="footer__links">
          <li className="footer__link">
            <a className="footer__link-text"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
            </li>
            <li className="footer__link">
            <a className="footer__link-text"
              href="https://github.com/AlekseyDream/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;