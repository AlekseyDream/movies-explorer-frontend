import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import films from '../../utils/films';

const MoviesCardList = () => {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {films.map((films, index) => {
          return (
            <MoviesCard
              key={index}
              image={films.image}
              name={films.nameRU}
            />
          );
        })}
      </ul>
      <button type="button" className="movies-cards__add-button">Ещё</button>
      <div className="movies-cards__saveddevider" aria-label="Секция отделяющая карточки от Footer"></div>
    </section>
  );
};

export default MoviesCardList;