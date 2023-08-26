import './NotFound.css';

const NotFound = ({ onBack }) => {
  return (
    <main className="not-found">
      <div className="not-found__text-container">
        <h1 className="not-found__error">404</h1>
        <span className="not-found__error-name">Страница не найдена</span>
      </div>
      <button
        className="not-found__button"
        type="submit"
        onClick={onBack}
      >
        Назад
      </button>
    </main>
  );
};

export default NotFound;