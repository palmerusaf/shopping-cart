import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/page-routes.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import React, { useState, useEffect } from "react";

function App() {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleAdjustAmountButton = (e) => {
    const buttonType = e.target.textContent;
    const cartId = e.target.parentNode.parentNode.id;
    if (buttonType === "+") return increaseProductAmount(cartId);
    if (getProductAmount(cartId) === 1 && buttonType === "-")
      return removeProductFromCart(cartId);
    if (buttonType === "-") return decreaseProductAmount(cartId);
  };

  const handleAdjustAmountInput = (e) => {
    const productIndex = e.target.parentNode.parentNode.id;
    const userInput = e.target.value;
    const newAmount = userInput !== "" ? parseInt(userInput, 10) : 1;
    adjustProductAmount(productIndex, newAmount);
  };

  const handleAddToCart = (event) => {
    const index = getProductIndex(event);
    if (productIsInCart(index)) {
      increaseProductAmount(index);
    } else {
      addProductToCart(index);
    }

    function addProductToCart(index) {
      setCartItems(cartItems.concat({ index: index, amount: 1 }));
    }

    function getProductIndex(event) {
      const { parentNode } = event.target;
      const index = [...parentNode.parentNode.children].indexOf(parentNode);
      return index;
    }
  };

  useEffect(() => {
    setTotalCartItems(getTotalFrom(cartItems));
  }, [cartItems]);

  function productIsInCart(index) {
    return cartItems.some((item) => item.index === index);
  }

  function increaseProductAmount(productIndex) {
    const newAmount = getProductAmount(productIndex) + 1;
    adjustProductAmount(productIndex, newAmount);
  }

  function decreaseProductAmount(cartId) {
    const newAmount = getProductAmount(cartId) - 1;
    adjustProductAmount(cartId, newAmount);
  }

  function removeProductFromCart(productIndex) {
    setCartItems(cartItems.filter((item) => item.index != productIndex));
  }

  function adjustProductAmount(productIndex, newAmount) {
    setCartItems(
      cartItems.map((item) => {
        if (item.index == productIndex) {
          return { ...item, amount: newAmount };
        }
        return item;
      })
    );
  }

  function getProductAmount(productIndex) {
    const product = cartItems.find((item) => item.index == productIndex);
    return product.amount;
  }

  function getTotalFrom(cartItems) {
    const total = cartItems.reduce((total, { amount }) => {
      return (total += amount);
    }, 0);
    return total;
  }

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
