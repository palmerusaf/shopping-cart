import CardArea from "../card-area.js";

export default function Shopping(props) {
  return (
    <div className="home">
      <CardArea addToCartClick={props.addToCartClick} />
    </div>
  );
}
