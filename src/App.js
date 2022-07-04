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

  const handleAdjustAmountInput = (event) => {
    const { data } = event.nativeEvent;
    if (isNaN(data)) return;
    console.log("data :>> ", data);
  };

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

  function increaseProductAmount(productIndex) {
    const newAmount = getProductAmount(productIndex) + 1;
    adjustProductAmount(productIndex, newAmount);
  }

  function decreaseProductAmount(productIndex) {
    const newAmount = getProductAmount(productIndex) - 1;
    adjustProductAmount(productIndex, newAmount);
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
