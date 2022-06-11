import "../styles/nav-bar.scss";
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const activeClassName = "active";
  const setClass = ({ isActive }) => (isActive ? activeClassName : undefined);

  return (
    <nav>
      <ul>
        <li>
          <NavLink className={setClass} to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={setClass} to="/shop">
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink className={setClass} to="/checkout">
            Checkout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
