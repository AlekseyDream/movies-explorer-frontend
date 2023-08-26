import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs-info">
          <h3 className="techs-info__description">7 технологий</h3>
          <p className="techs-info__paragraph">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="techs__block">
            <li className="techs__block-element">
              <a
                href="https://doka.guide/html/html"
                target="_blank"
                rel="noreferrer"
                className="techs__block-link"
              >
                HTML
              </a>
            </li>
            <li className="techs__block-element">
              <a
                href="https://doka.guide/css/"
                target="_blank"
                rel="noreferrer"
                className="techs__block-link"
              >
                CSS
              </a>
            </li>
            <li className="techs__block-element">
              <a
                href="https://doka.guide/js/"
                target="_blank"
                rel="noreferrer"
                className="techs__block-link"
              >
                JS
              </a>
            </li>
            <li className="techs__block-element">
              <a
                href="https://doka.guide/js/react-and-alternatives/"
                target="_blank"
                rel="noreferrer"
                className="techs__block-link"
              >
                React
              </a>
            </li>
            <li className="techs__block-element">
              <a
                href="https://doka.guide/tools/git-cli/"
                target="_blank"
                rel="noreferrer"
                className="techs__block-link"
              >
                Git
              </a>
            </li>
            <li className="techs__block-element">
              <a
                href="https://doka.guide/tools/nodejs/"
                target="_blank"
                rel="noreferrer"
                className="techs__block-link"
              >
                Express.js
              </a>
            </li>
            <li className="techs__block-element">
              <a
                href="https://www.mongodb.com/docs/"
                target="_blank"
                rel="noreferrer"
                className="techs__block-link"
              >
                mongoDB
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;