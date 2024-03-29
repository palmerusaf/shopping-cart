import "../styles/header.scss";
import React from "react";
import NavBar from "./nav-bar";
import Logo from "../imgs/popcopy-logo.png";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <Link to={"/"}>
        <h1 className="logo">
          <img src={Logo} alt="logo" />
        </h1>
      </Link>
      <NavBar totalCartItems={props.totalCartItems} />
    </header>
  );
}

export default Header;
