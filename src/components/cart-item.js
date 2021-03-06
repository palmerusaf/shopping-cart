import "../styles/cart-item.scss";
import React, { useState, useEffect } from "react";

export default function CartItem(props) {
  const { product, item } = props;
  const { handleAdjustAmountButton, handleAdjustAmountInput } =
    props.cartEvents;

  const [inputValue, setInputValue] = useState(item.amount);

  const handleChange = (e) => {
    const { value } = e.target;
    if (isInvalidInput(+value)) return;
    setInputValue(+value);

    function isInvalidInput(input) {
      return isNaN(input) || input < 1;
    }
  };

  const styleAsDelete = item.amount == 1 ? { backgroundColor: "red" } : {};

  useEffect(() => {
    setInputValue(`${+item.amount}`);
  }, [item]);

  return (
    <div key={product.title} id={item.index} className="cart-item">
      <img src={product.image} alt={product.title} className="cart-item__img" />
      <h2 className="cart-item__title">{product.title}</h2>
      <h3 className="cart-item__price-label">
        Price: <span className="cart-item__price">{product.price}</span>
      </h3>
      <div className="amount-adj">
        <span className="amount-adj__label">Adjust Quantity</span>
        <button
          style={styleAsDelete}
          className="amount-adj__button"
          onClick={handleAdjustAmountButton}
        >
          -
        </button>
        <input
          onChange={handleChange}
          type="number"
          value={inputValue}
          className="amount-adj__input"
          id="amount-adj__input"
          onBlur={handleAdjustAmountInput}
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
}
