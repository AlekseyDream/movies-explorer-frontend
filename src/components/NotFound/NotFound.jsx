import './NotFound.css';

function NotFound({goBack}) {

  return (
    <main className="error ">
      <h1 className="error__title">
        404
      </h1>
      <p className="error__text">
        Страница не найдена
      </p>
      <button
        className="error__button"
        type="button"
        onClick={goBack}
      >
        Назад
      </button>
    </main>
  )
};

export default NotFound;
