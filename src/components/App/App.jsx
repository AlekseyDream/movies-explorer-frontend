import { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = (evt) => {
    evt.preventDefault();
    setIsLoggedIn(true);
    navigate('/signup');
  };

  const register = (evt) => {
    evt.preventDefault();
    navigate('/signin');
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  };

  const isBurgerOpened = false;

  const path = useLocation().pathname;
  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];

  const goBack = () => {
    navigate(-1);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {headerPaths.includes(path) && (
          <Header
            logIn={logIn}
            isLoggedIn={isLoggedIn} 
            isBurgerOpened={isBurgerOpened}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={<Main />}
          ></Route>
          <Route
            path="/movies"
            element={<Movies isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route
            path="/saved-movies"
            element={<SavedMovies isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                isLoggedIn={isLoggedIn}
                onClick={logOut}
              />
            }
          ></Route>
          <Route
            path="/signin"
            element={<Login logIn={logIn} />}
          ></Route>
          <Route
            path="/signup"
            element={<Register register={register} />}
          ></Route>
          <Route
            path="*"
            element={<NotFound onBack={goBack} />}
          ></Route>
        </Routes>
        {footerPaths.includes(path) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;