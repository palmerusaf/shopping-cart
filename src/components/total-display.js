import currency from "currency.js";

export default function TotalDisplay(props) {
  const { PRODUCTS, cartItems } = props;

  const total = cartItems.length ? calculateTotal() : "$0.00";

  function calculateTotal() {
    const subTotals = calculateSubTotals();
    const total = subTotals.reduce((total, subTotal) => {
      return currency(total).add(subTotal).format();
    }, 0);

    return total;

    function calculateSubTotals() {
      return cartItems.map((item) => {
        const price = PRODUCTS[item.index].price;
        const subTotal = currency(price).multiply(item.amount);
        return subTotal;
      });
    }
  }

  return (
    <h3>
      Total: <span>{total}</span>
    </h3>
  );
}
