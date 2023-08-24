import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = () => {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList />
      <div className="saved-movies__saveddevider" aria-label="Секция отделяющая карточки от Footer"></div>
    </section>
  );
};

export default SavedMovies;