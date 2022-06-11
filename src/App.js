import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/page-routes.js";
import NavBar from "./components/nav-bar.js";
import Footer from "./components/footer.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <PageRoutes />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
