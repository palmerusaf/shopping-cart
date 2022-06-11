import "../styles/nav-bar.scss";
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const activeClassName = "active";

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            to="/home"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
            to="/shop"
          >
            Shop
          </NavLink>
        </li>
        <li>
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
