import "../styles/product-card.scss";
import React, { useState } from "react";

export default function ProductCard(props) {
  const { title, price, description, image } = props.productData;
  const [buttonName, setButtonName] = useState("Add to Cart");

  const changeButtonText = () => {
    setButtonName("Adding to Cart...");
    setTimeout(() => {
      setButtonName("Add to Cart");
    }, 1000);
  };

  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <img
        onClick={() => window.open(`${image}`)}
        className="card__img"
        src={image}
        alt={title}
      />
      <p className="card__description">{description}</p>
      <label className="card__price" htmlFor="price">
        Price:{" "}
        <data id="price" value={price}>
          {price}
        </data>
      </label>
      <button className="card__add-button" onClick={changeButtonText}>
        {buttonName}
      </button>
    </div>
  );
}
