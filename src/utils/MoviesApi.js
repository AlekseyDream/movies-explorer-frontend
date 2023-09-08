const BASE_URL = {
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
  
    _handleResponse(res) {
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
        .then(res => this._handleResponse(res));
    }
  }
  
  const moviesApi = new MoviesApi(BASE_URL);
  
  export default moviesApi;