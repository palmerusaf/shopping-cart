export default function TotalDisplay(props) {
  const { PRODUCTS, cartItems } = props;

  const total = cartItems.length ? calculateTotal() : "$0.00";

  function calculateTotal() {
    const subTotals = cartItems.map((item) => {
      const price = PRODUCTS[item.index].price;
      const subTotal = unFormat(price) * item.amount;
      return subTotal;
    });
    const total = subTotals.reduce((total, subTotal) => {
      return (total += subTotal);
    }, 0);
    return reFormat(total);

    function unFormat(input) {
      return +input.toString().replace("$", "").replace(".", "");
    }

    function reFormat(input) {
      input = input.toString();
      while (input.length < 3) input = "0" + input;
      return "$" + input.slice(0, -2) + "." + input.slice(-2);
    }
  }

  return (
    <span>
      Total: <span>{total}</span>
    </span>
  );
}
