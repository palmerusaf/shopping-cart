import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Checkout from "./pages/checkout";
import Shopping from "./pages/shopping";
import Sorry from "./pages/sorry";
import PRODUCTS from '../data/products.json';

export default function PageRoutes() {
  const addToCartClick = console.log;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/shop"
        element={<Shopping PRODUCTS={PRODUCTS} addToCartClick={addToCartClick} />}
      />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<Sorry />} />
    </Routes>
  );
}
