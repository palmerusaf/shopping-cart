import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<App />);
});

describe("Test Cart Icon without userEvents", () => {
  it("Cart icon renders", () => {
    const cartIcon = screen.getByText("shopping_cart");
    expect(cartIcon.textContent).toEqual("shopping_cart");
  });

  it("Cart icon should render with no children when empty", () => {
    const cartIcon = screen.getByText("shopping_cart");
    expect(cartIcon.children.length).toEqual(0);
  });
});

describe('"Test Cart Icon with userEvents"', () => {
  beforeEach(() => {
    goToShoppingScreen();
  });

  it("Cart icon should display span with content one when add to cart button is pressed one time", () => {
    clickAddCartButton({ numOfClicks: 1 });

    const itemsIndicator = screen.getByTestId("items-indicator");
    expect(itemsIndicator.textContent).toEqual("1");
  });

  it("Cart icon should display span with content two when add to cart button is pressed two times", () => {
    clickAddCartButton({ numOfClicks: 2 });

    const itemsIndicator = screen.getByTestId("items-indicator");
    expect(itemsIndicator.textContent).toEqual("2");
  });

  function goToShoppingScreen() {
    const shoppingLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shoppingLink);
  }

  function clickAddCartButton({ numOfClicks }) {
    const addToCartButton = screen.getAllByRole("button", {
      name: "Add to Cart",
    });
    for (let i = 0; i < numOfClicks; i++) userEvent.click(addToCartButton[0]);
  }
});
