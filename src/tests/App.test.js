import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

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

    it("First item img and title are rendered correctly", () => {
      expect(screen.getByAltText("Toner")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Toner" })
      ).toBeInTheDocument();
    });

    it("Second item img and title are rendered correctly", () => {
      expect(screen.getByAltText("Plastic Cement")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Plastic Cement" })
      ).toBeInTheDocument();
    });

    it("Quantity adjustment buttons are rendered", () => {
      const labels = screen.getAllByLabelText("Adjust Quantity");
      const spinButtons = screen.getAllByRole("spinbutton");
      const subtractButtons = screen.getAllByRole("button", { name: "-" });
      const addButtons = screen.getAllByRole("button", { name: "+" });

      expect(labels.length).toEqual(2);
      expect(spinButtons.length).toEqual(2);
      expect(subtractButtons.length).toEqual(2);
      expect(addButtons.length).toEqual(2);
    });
  });

  describe("Quantity of Items Tests", () => {
    beforeEach(() => {
      clickAddToCart({ numOfClicks: 2, btnIndex: 0 });
      clickAddToCart({ numOfClicks: 2, btnIndex: 1 });
      goToScreen("shopping_cart");
    });

    it("First item should have quantity of two when added twice", () => {
      const spinButtons = screen.getAllByRole("spinbutton");
      expect(spinButtons[0].value).toEqual(2);
    });
    it("Second item should have quantity of three when added three times", () => {
      const spinButtons = screen.getAllByRole("spinbutton");
      expect(spinButtons[1].value).toEqual(3);
    });
  });

  describe("Quantity Adjustment Tests", () => {
    beforeEach(() => {
      clickAddToCart({ numOfClicks: 2, btnIndex: 0 });
      goToScreen("shopping_cart");
    });

    it("Decrement button decreases the quantity of an item", () => {
      const minusButton = screen.getByRole("button", { name: "-" });
      userEvent.click(minusButton);
      const spinButton = screen.queryByRole("spinbutton");
      expect(spinButton).toHaveValue(1);
    });

    it("Decrement button deletes item when quantity is 1", () => {
      const minusButton = screen.getByRole("button", { name: "-" });
      userEvent.click(minusButton);
      userEvent.click(minusButton);

      const spinButton = screen.queryByRole("spinbutton");
      expect(spinButton).toBeNull();
      const label = screen.queryByLabelText("Adjust Quantity");
      expect(label).toBeNull();
      const subtractButton = screen.queryByRole("button", { name: "-" });
      expect(subtractButton).toBeNull();
      const addButton = screen.queryByRole("button", { name: "+" });
      expect(addButton).toBeNull();
      const img = screen.queryByAltText("Toner");
      expect(img).toBeNull();
      const title = screen.queryByRole("heading", { name: "Toner" });
      expect(title).toBeNull();
    });

    it("Increment button increases the quantity of an item", () => {
      const addButton = screen.getByRole("button", { name: "+" });
      userEvent.click(addButton);
      const spinButton = screen.queryByRole("spinbutton");
      expect(spinButton).toHaveValue(3);
    });

    it("Setting adjuster input to 3 sets quantity of an item to 3", () => {
      const spinButton = screen.queryByRole("spinbutton");
      userEvent.type(spinButton, "3");
      expect(spinButton).toHaveValue(3);
    });

    it("Changing quantity also changes quantity on cart icon", () => {
      const itemsIndicator = screen.getByTestId("items-indicator");
      expect(itemsIndicator.textContent).toEqual(2);

      const spinButton = screen.queryByRole("spinbutton");
      userEvent.type(spinButton, "9");
      expect(itemsIndicator.textContent).toEqual(9);
    });
  });

  describe("Total Price Tests", () => {
    it("Single item produces correct total", () => {
      clickAddToCart({ numOfClicks: 1 });
      goToScreen("shopping_cart");

      const label = screen.getByLabelText("total");
      const totalAmount = within(label).queryByText("$96.69");
      expect(totalAmount).toBeInTheDocument();
    });

    it("Same item twice produces correct total", () => {
      clickAddToCart({ numOfClicks: 2 });
      goToScreen("shopping_cart");

      const label = screen.getByLabelText("total");
      const totalAmount = within(label).queryByText("$193.38");
      expect(totalAmount).toBeInTheDocument();
    });

    it("Two different single items produces correct total", () => {
      clickAddToCart({ numOfClicks: 1, btnIndex: 0 });
      clickAddToCart({ numOfClicks: 1, btnIndex: 1 });
      goToScreen("shopping_cart");

      const label = screen.getByLabelText("total");
      const totalAmount = within(label).queryByText("$106.68");
      expect(totalAmount).toBeInTheDocument();
    });

    it("Two different items each with quantity of two produces correct total", () => {
      clickAddToCart({ numOfClicks: 2, btnIndex: 0 });
      clickAddToCart({ numOfClicks: 2, btnIndex: 1 });
      goToScreen("shopping_cart");

      const label = screen.getByLabelText("total");
      const totalAmount = within(label).queryByText("$213.36");
      expect(totalAmount).toBeInTheDocument();
    });
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
