import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Checkout from "./pages/checkout";
import Shopping from "./pages/shopping";
import PRODUCTS from "../data/products.json";

export default function PageRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/shop"
        element={
          <Shopping
            PRODUCTS={PRODUCTS}
            handleAddToCart={props.events.handleAddToCart}
          />
        }
      />
      <Route
        path="/checkout"
        element={
          <Checkout
            PRODUCTS={PRODUCTS}
            cartEvents={{
              handleAdjustAmountButton: props.events.handleAdjustAmountButton,
              handleAdjustAmountInput: props.events.handleAdjustAmountInput,
            }}
            cartItems={props.cartItems}
          />
        }
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
