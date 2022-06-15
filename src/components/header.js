import "../styles/header.scss";
import React from "react";
import NavBar from "./nav-bar";

function Header() {
  return (
    <header>
      <h1 className="logo">p<span className="logo__letter-o">o</span>pcopy</h1>
      <NavBar />
    </header>
  );
}

export default Header;
