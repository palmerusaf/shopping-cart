import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Checkout from "./pages/checkout";
import Shopping from "./pages/shopping";
import Sorry from "./pages/sorry";

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shop" element={<Shopping />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<Sorry />} />
    </Routes>
  );
}
