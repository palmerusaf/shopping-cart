import "../styles/header.scss";
import React from "react";
import NavBar from "./nav-bar";
import Logo from "../imgs/popcopy-logo.jpg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to={"/"}>
        <h1 className="logo">
          <img src={Logo} alt="logo" />
        </h1>
      </Link>
      <NavBar />
    </header>
  );
}

export default Header;
