import ProductCard from "./product-card.js";
import products from "../data/products.json";

export default function CardArea() {
  const mapDataToCards = (data) =>
    data.map((item) => <ProductCard productData={item} key={item.id} />);

  return <div className="card-area">{mapDataToCards(products)}</div>;
}
