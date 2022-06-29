import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../App";
import userEvent from "@testing-library/user-event";

render(<App />);
const cartIcon = screen.getByText("shopping_cart");

describe("Test Cart Icon without userEvents", () => {
  it("Cart icon renders", () => {
    expect(cartIcon.textContent).toEqual("shopping_cart");
  });

  it("Cart icon should render with no children when empty", () => {
    expect(cartIcon.children.length).toEqual(0);
  });
});

describe('"Test Cart Icon with userEvents"', () => {
  goToShoppingScreen();

  const addToCartButton = screen.getAllByRole("button", {
    name: "Add to Cart",
  });

  it("Cart icon should display span with content one when add to cart button is pressed one time", () => {
    userEvent.click(addToCartButton[0]);
    expect(cartIcon.firstElementChild.textContent).toEqual("1");
  });

  it("Cart icon should display span with content two when add to cart button is pressed two times", () => {
    userEvent.click(addToCartButton[0]);
    userEvent.click(addToCartButton[0]);
    expect(cartIcon.firstElementChild.textContent).toEqual("2");
  });

  function goToShoppingScreen() {
    const shoppingLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shoppingLink);
  }
});
