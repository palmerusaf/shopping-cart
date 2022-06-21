import ProductCard from "./product-card.js";
import products from "../data/products.json";

export default function CardArea(props) {
  const mapDataToCards = (data) =>
    data.map((item) => (
      <ProductCard
        addToCartClick={props.addToCartClick}
        productData={item}
        key={item.title}
      />
    ));

  return <div className="card-area">{mapDataToCards(products)}</div>;
}
