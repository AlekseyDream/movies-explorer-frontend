import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import './App.css';

const App = () => {
  const loggedIn = true;
  const isBurgerOpened = false;

  return (
    <div className="app">
      <Header loggedIn={loggedIn}
        isBurgerOpened={isBurgerOpened} />
      <Landing />
      <Movies />
      <Footer />
    </div>
  );
}

export default App;