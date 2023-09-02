const apiOptions = {
    baseUrl: 'https://api.dream.movie.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  class Api {
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
  
    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        })
          .then(this._handleResponse);;
      };
    
      authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
          .then(this._handleResponse);
      };
    
      getContent (token) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
          .then(this._handleResponse);
      };

    getUserData() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      })
        .then(this._handleResponse)
    }
  
    editUserData(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
  
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
      }),
      })
        .then(this._handleResponse)
    }
  
    getSavedMovies() {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      })
      .then(this._handleResponse)
    };
  
    NewSavedMovie(movieData) {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      })
      .then(this._handleResponse)
    };
  
    deleteSavedMovie(movieId) {
      return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      })
        .then(this._handleResponse);
    }
  }
  
  const api = new Api(apiOptions)
  
  export default api