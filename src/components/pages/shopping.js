import ProductCard from "../product-card.js";

export default function Shopping(props) {
  const { PRODUCTS, addToCartClick } = props;

  const productCards = PRODUCTS.map((product) => (
    <ProductCard
      addToCartClick={addToCartClick}
      productData={product}
      key={product.title}
    />
  ));

  return <div className="card-area">{productCards}</div>;
}
