import ProductCard from "../product-card.js";

export default function Shopping(props) {
  const { PRODUCTS, handleAddToCart } = props;

  const productCards = PRODUCTS.map((product) => (
    <ProductCard
      handleAddToCart={handleAddToCart}
      productData={product}
      key={product.title}
    />
  ));

  return <div className="card-area">{productCards}</div>;
}
