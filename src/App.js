import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./components/page-routes.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import React, { useState, useEffect } from "react";

function App() {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleAdjustAmountButton = (event) => {
    const buttonType = event.target.textContent;
    const index = event.target.parentNode.parentNode.id;
    if (buttonType === "+") {
      increaseProductAmount(index);
    } else {
      decreaseProductAmount(index);
    }
  };
  const handleAdjustAmountInput = (event) => {};

  const handleAddToCart = (event) => {
    const index = getProductIndex(event);
    if (productIsInCart(index)) {
      increaseProductAmount(index);
    } else {
      setCartItems(cartItems.concat({ index: index, amount: 1 }));
    }
  };

  useEffect(() => {
    setTotalCartItems(getTotalFrom(cartItems));
  }, [cartItems]);

  function getProductIndex(event) {
    const { parentNode } = event.target;
    const index = [...parentNode.parentNode.children].indexOf(parentNode);
    return index;
  }

  function productIsInCart(index) {
    return cartItems.some((item) => item.index === index);
  }

  function increaseProductAmount(index) {
    setCartItems(
      cartItems.map((item) => {
        if (item.index == index) {
          const newAmount = item.amount + 1;
          return { ...item, amount: newAmount };
        }
        return item;
      })
    );
  }

  function decreaseProductAmount(index) {
    setCartItems(
      cartItems.map((item) => {
        if (item.index == index) {
          const newAmount = item.amount - 1;
          return { ...item, amount: newAmount };
        }
        return item;
      })
    );
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
