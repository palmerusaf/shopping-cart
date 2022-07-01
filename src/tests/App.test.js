import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<App />);
});

describe("Cart Icon Total Items Indicator Tests", () => {
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
      goToScreen("Shop");
    });

    it("Cart icon should display span with content one when add to cart button is pressed one time", () => {
      clickAddToCart({ numOfClicks: 1 });

      const itemsIndicator = screen.getByTestId("items-indicator");
      expect(itemsIndicator.textContent).toEqual("1");
    });

    it("Cart icon should display span with content two when add to cart button is pressed two times", () => {
      clickAddToCart({ numOfClicks: 2 });

      const itemsIndicator = screen.getByTestId("items-indicator");
      expect(itemsIndicator.textContent).toEqual("2");
    });
  });
});

describe("Checkout Screen Tests", () => {
  beforeEach(() => {
    goToScreen("Shop");
  });

  describe("Added Items are rendered Tests", () => {
    beforeEach(() => {
      clickAddToCart({ numOfClicks: 1, btnIndex: 0 });
      clickAddToCart({ numOfClicks: 1, btnIndex: 1 });
      goToScreen("shopping_cart");
    });

    it.todo("First item img and title are rendered correctly");
    it.todo("Second item img and title are rendered correctly");
    it.todo("Quantity adjustment buttons are rendered");
  });

  describe("Quantity of Items Tests", () => {
    beforeEach(() => {
      clickAddToCart({ numOfClicks: 2, btnIndex: 0 });
      clickAddToCart({ numOfClicks: 2, btnIndex: 1 });
      goToScreen("shopping_cart");
    });

    it.todo("First item should have quantity of two when added twice");
    it.todo("Second item should have quantity of two when added twice");
  });

  describe("Quantity Adjustment Tests", () => {
    it.todo("Decrement button decreases the quantity of an item");
    it.todo("Increment button increases the quantity of an item");
    it.todo("Setting adjuster input to 3 sets quantity of an item to 3");
    it.todo('Changing quantity also changes quantity on cart icon');
  });

  describe('Total Price Tests', () => {
    it.todo('Single item produces correct total');
    it.todo('Same item twice produces correct total');
    it.todo('Two different single items produces correct total');
    it.todo('Two different items each with quantity of two produces correct total');
  });
});

function goToScreen(name) {
  const shoppingLink = screen.getByRole("link", { name });
  userEvent.click(shoppingLink);
}

function clickAddToCart({ numOfClicks, btnIndex = 0 }) {
  const addToCartButton = screen.getAllByRole("button", {
    name: "Add to Cart",
  });
  for (let i = 0; i < numOfClicks; i++)
    userEvent.click(addToCartButton[btnIndex]);
}
