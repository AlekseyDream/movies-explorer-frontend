import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import cards from '../../images/cards';

const MoviesCardList = () => {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {cards.map((cards, index) => {
          return (
            <MoviesCard
              key={index}
              image={cards.image}
              name={cards.nameRU}
            />
          );
        })}
      </ul>
      <button className="movies-cards__add-button">Ещё</button>
    </section>
  );
};

export default MoviesCardList;