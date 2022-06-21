export default function ProductCard(props) {
  const { addToCartClick } = props;
  const { title, price, description, image } = props.productData;

  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <img className="card__img" src={image} alt={title} />
      <p className="card__description">{description}</p>
      <label className="card__price" htmlFor="price">
        Price:{" "}
        <data id="price" value={price}>
          {price}
        </data>
      </label>
      <button className="card__add-button" onClick={addToCartClick}>
        Add to Cart
      </button>
    </div>
  );
}
