import './Promo.css';
import logo from '../../images/landing-logo.svg';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <img
          src={logo}
          alt="Лого"
          className="promo__logo"
        />
        <div className="promo__block-project">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Promo;