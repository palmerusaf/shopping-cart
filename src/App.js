import './App.scss';
import Router from './components/router';
import NavBar from './components/nav-bar.js';
import Footer from './components/footer.js';


function App() {
  return (
    <div className="App">
      <Router/>
      <NavBar/>
      <Footer/>
    </div>
  );
}

export default App;
