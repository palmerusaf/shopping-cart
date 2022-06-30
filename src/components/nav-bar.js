import "../styles/nav-bar.scss";
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar(props) {
  const activeClassName = "active";
  const setClass = ({ isActive }) => (isActive ? activeClassName : undefined);

  const { totalCartItems } = props;
  const itemsIndicator =
    totalCartItems !== 0 ? (
      <span data-testid="items-indicator" className="cart-icon__indicator">
        {totalCartItems}
      </span>
    ) : null;

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
            <span className="material-symbols-sharp cart-icon">
              shopping_cart{itemsIndicator}
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
