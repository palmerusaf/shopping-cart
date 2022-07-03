import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Checkout from "./pages/checkout";
import Shopping from "./pages/shopping";
import Sorry from "./pages/sorry";
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
            handleAddToCart={props.handleAddToCart}
          />
        }
      />
      <Route
        path="/checkout"
        element={<Checkout PRODUCTS={PRODUCTS} cartItems={props.cartItems} />}
      />
      <Route path="*" element={<Sorry />} />
    </Routes>
  );
}
