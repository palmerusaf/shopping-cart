import { displayEmptyCart } from "./displayEmptyCart";

export default function Checkout(props) {
  const { cartItems, PRODUCTS } = props;
  const handleAdjustAmountButton = (event) => {
    console.log("buttonEvent :>> ", event);
  };
  const handleAdjustAmountInput = (event) => {
    console.log("inputEvent :>> ", event);
  };

  const displayCartItems = () => {
    return cartItems.map((item) => {
      const product = PRODUCTS[item.index];
      return (
        <div key={product.title} className="cart-item">
          <img
            src={product.image}
            alt={product.title}
            className="cart-item__img"
          />
          <h2 className="cart-item__title">{product.title}</h2>
          <div className="amount-adj">
            <span className="amount-adj__label">Adjust Quantity</span>
            <button
              className="amount-adj__button"
              onClick={handleAdjustAmountButton}
            >
              -
            </button>
            <input
              type="number"
              value={item.amount}
              className="amount-adj__input"
              id="amount-adj__input"
              onChange={handleAdjustAmountInput}
            />
            <button
              className="amount-adj__button"
              onClick={handleAdjustAmountButton}
            >
              +
            </button>
          </div>
        </div>
      );
    });
  };

  const cartItemsDisplay =
    cartItems.length === 0 ? displayEmptyCart() : displayCartItems();

  return (
    <div className="checkout">
      <h1 className="checkout__title">My Cart</h1>
      {cartItemsDisplay}
    </div>
  );
}
