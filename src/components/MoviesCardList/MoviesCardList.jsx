import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.jsx'
import Preloader from '../Preloader/Preloader.jsx';
import SearchError from '../SearchErr/SearchErr.jsx';
import './MoviesCardList.css';

function MoviesCardList({ moviesData, isLoading, isNotFound }) {
  const { pathname } = useLocation();

  return (
    <main className="movies-cards" aria-label="Карточки фильмов">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />}
      <ul className="movies-cards__list">
        {
          moviesData.map((movie) => (
            <MoviesCard key={
              pathname === "/movies"
                ? movie.id
                : movie._id
            } movieData={movie} />
          ))
        }
      </ul>
    </main>
  )
};

export default MoviesCardList;
