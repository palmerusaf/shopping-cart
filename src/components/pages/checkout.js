import { displayEmptyCart } from "./displayEmptyCart";

export default function Checkout(props) {
  const { cartItems } = props;

  const cartDisplay = cartItems.length === 0 ? displayEmptyCart() : null;

  return (
    <div className="checkout">
      <h1 className="checkout__title">My Cart</h1>
      {cartDisplay}
    </div>
  );
}
