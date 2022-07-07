import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/page-routes.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import React, { useState, useEffect } from "react";
import { Cart } from "./components/cart.js";

function App() {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleAdjustAmountButton = (e) => {
    const buttonType = e.target.textContent;
    const cartItemId = e.target.parentNode.parentNode.id;
    const cart = Cart(cartItems);
    if (buttonType === "+")
      return setCartItems(cart.increaseProductAmount(cartItemId));
    if (cart.getProductAmount(cartItemId) === 1 && buttonType === "-")
      return setCartItems(cart.removeProductFromCart(cartItemId));
    if (buttonType === "-")
      return setCartItems(cart.decreaseProductAmount(cartItemId));
  };

  const handleAdjustAmountInput = (e) => {
    const cartItemId = e.target.parentNode.parentNode.id;
    const userInput = e.target.value;
    const cart = Cart(cartItems);
    setCartItems(
      cart.adjustProductAmount(cartItemId, trimLeadingZeros(userInput))
    );

    function trimLeadingZeros(input) {
      return parseInt(input, 10);
    }
  };

  const handleAddToCart = (event) => {
    const index = getProductIndex(event);
    const cart = Cart(cartItems);
    if (cart.productIsInCart(index)) {
      setCartItems(cart.increaseProductAmount(index));
    } else {
      setCartItems(cart.addProductToCart(index));
    }

    function getProductIndex(event) {
      const { parentNode } = event.target;
      const index = [...parentNode.parentNode.children].indexOf(parentNode);
      return index;
    }
  };

  useEffect(() => {
    const cart = Cart(cartItems);
    setTotalCartItems(cart.getTotalCartItems());
  }, [cartItems]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header totalCartItems={totalCartItems} />
        <PageRoutes
          events={{
            handleAddToCart,
            handleAdjustAmountButton,
            handleAdjustAmountInput,
          }}
          cartItems={cartItems}
        />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
