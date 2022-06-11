import "../styles/nav-bar.scss";
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const activeClassName = "nav-bar__item--active";

  return (
    <nav className="nav-bar">
      <ul>
        <li className="nav-bar__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            to="/home"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            to="/shop"
          >
            Shop
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            to="/checkout"
          >
            Checkout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
