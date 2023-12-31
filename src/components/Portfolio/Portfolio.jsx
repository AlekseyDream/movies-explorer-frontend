import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title portfolio__title_type_portfolio">
          Портфолио
        </h2>
        <ul className="portfolio__list">
          <li className="portfolio__element">
            <a
              href="https://github.com/AlekseyDream/how-to-learn/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__link"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__element">
            <a
              href="https://github.com/AlekseyDream/russian-travel/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__link"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__element">
            <a
              href="https://github.com/AlekseyDream/mesto/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__link"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;