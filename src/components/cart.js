export function Cart(pCartItems) {
  const cartItems = pCartItems;

  function productIsInCart(index) {
    return cartItems.some((item) => item.index === index);
  }

  function addProductToCart(index) {
    return cartItems.concat({ index: index, amount: 1 });
  }

  function increaseProductAmount(productIndex) {
    const newAmount = getProductAmount(productIndex) + 1;
    return adjustProductAmount(productIndex, newAmount);
  }

  function decreaseProductAmount(cartId) {
    const newAmount = getProductAmount(cartId) - 1;
    return adjustProductAmount(cartId, newAmount);
  }

  function removeProductFromCart(productIndex) {
    return cartItems.filter((item) => item.index != productIndex);
  }

  function adjustProductAmount(productIndex, newAmount) {
    return cartItems.map((item) => {
      if (item.index == productIndex) {
        return { ...item, amount: newAmount };
      }
      return item;
    });
  }

  function getProductAmount(productIndex) {
    const product = cartItems.find((item) => item.index == productIndex);
    return product.amount;
  }

  function getTotalCartItems() {
    const total = cartItems.reduce((total, { amount }) => {
      return (total += amount);
    }, 0);
    return total;
  }

  return {
    productIsInCart,
    addProductToCart,
    increaseProductAmount,
    decreaseProductAmount,
    removeProductFromCart,
    adjustProductAmount,
    getProductAmount,
    getTotalCartItems,
  };
}
