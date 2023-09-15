const movieOptions = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
};

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._baseUrl, {
        method: 'GET',
        headers: this._headers,
      })
      .then(res => this._getResponse(res));
  }
}

const moviesApi = new MoviesApi(movieOptions);

export default moviesApi;
