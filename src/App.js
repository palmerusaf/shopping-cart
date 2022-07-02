import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/page-routes.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import React, { useState } from "react";

function App() {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (event) => {
    setTotalCartItems(totalCartItems + 1);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header totalCartItems={totalCartItems} />
        <PageRoutes handleAddToCart={handleAddToCart} cartItems={cartItems} />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
