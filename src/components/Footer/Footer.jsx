import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__start">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className="footer__end">
        <p className="footer__copyright">© 2023</p>
        <ul className="footer__list">
          <li className="footer__item">
            <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__item">
            <a href="https://github.com/AlekseyDream" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
