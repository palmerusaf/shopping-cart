import "../../styles/checkout.scss";
import { displayEmptyCart } from "../displayEmptyCart";
import CartItem from "../cart-item.js";
import TotalDisplay from "../total-display";

export default function Checkout(props) {
  const { cartItems, PRODUCTS } = props;

  const displayCartItems = () => {
    return cartItems.map((item) => {
      const product = PRODUCTS[item.index];
      return (
        <CartItem
          key={product.title}
          cartEvents={props.cartEvents}
          product={product}
          item={item}
        />
      );
    });
  };

  const cartItemsDisplay =
    cartItems.length === 0 ? displayEmptyCart() : displayCartItems();

  return (
    <div className="checkout">
      <h1 className="checkout__title">My Cart</h1>
      <div className="checkout__cart-items-area"> {cartItemsDisplay}</div>
      <TotalDisplay
        cartItems={cartItems}
        PRODUCTS={PRODUCTS}
      />
    </div>
  );
}
