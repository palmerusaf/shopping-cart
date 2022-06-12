import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/page-routes.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <PageRoutes />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
