import {
  act,
  queryAllByRole,
  render,
  screen,
  within,
} from "@testing-library/react";
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

  describe("Test Cart Icon with userEvents", () => {
    beforeEach(() => {
      goToScreen("Shop");
    });

    it("Cart icon should display span with content one when add to cart button is pressed one time", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const itemsIndicator = screen.getByTestId("items-indicator");
      expect(itemsIndicator.textContent).toEqual("1");
    });

    it("Cart icon should display span with content two when add to cart button is pressed two times", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const itemsIndicator = screen.getByTestId("items-indicator");
      expect(itemsIndicator.textContent).toEqual("2");
    });
  });
});

describe("Checkout Screen Tests", () => {
  beforeEach(() => {
    goToScreen("Shop");
  });

  it("Display empty msg when cart is empty", () => {
    goToScreen("shopping_cart");
    const emptyMsg = screen.queryByText(/empty/i);
    expect(emptyMsg).toBeInTheDocument();
  });

  describe("Added Items are rendered Tests", () => {
    beforeEach(() => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
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
      const labels = screen.getAllByText("Adjust Quantity");
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
    beforeEach(() => {});

    it("First item should have quantity of two when added twice", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      userEvent.click(addCartButtons[1]);
      goToScreen("shopping_cart");
      const spinButtons = screen.getAllByRole("spinbutton");
      expect(spinButtons[0].value).toEqual("2");
    });

    it("Second item should have quantity of three when added three times", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      userEvent.click(addCartButtons[1]);
      userEvent.click(addCartButtons[1]);
      goToScreen("shopping_cart");

      const spinButtons = screen.getAllByRole("spinbutton");
      expect(spinButtons[1].value).toBe("3");
    });
  });

  describe("Quantity Adjustment Tests", () => {
    it("Decrement button decreases the quantity of an item", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const minusButton = screen.getByRole("button", { name: "-" });
      userEvent.click(minusButton);
      const spinButton = screen.queryByRole("spinbutton");
      expect(spinButton).toHaveValue(1);
    });

    it("Decrement button deletes item when quantity is 1", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

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

    it("Decrement deletion works when two different products are present", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      goToScreen("shopping_cart");

      const minusButton = screen.getAllByRole("button", { name: "-" });
      userEvent.click(minusButton[0]);
      userEvent.click(minusButton[1]);

      const spinButton = screen.queryAllByRole("spinbutton");
      const title = screen.queryAllByRole("heading", { name: "Toner" });
      const img = screen.queryAllByAltText("Toner");
      const addButton = screen.queryAllByRole("button", { name: "+" });
      const subtractButton = screen.queryAllByRole("button", { name: "-" });
      const label = screen.queryAllByLabelText("Adjust Quantity");

      expect(spinButton).toHaveLength(0);
      expect(label).toHaveLength(0);
      expect(subtractButton).toHaveLength(0);
      expect(addButton).toHaveLength(0);
      expect(img).toHaveLength(0);
      expect(title).toHaveLength(0);
    });

    it("Increment button increases the quantity of an item", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const addButton = screen.getByRole("button", { name: "+" });
      userEvent.click(addButton);
      const spinButton = screen.queryByRole("spinbutton");
      expect(spinButton).toHaveValue(3);
    });

    it("Setting adjuster input to 3 sets quantity of an item to 3", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const spinButton = screen.queryByRole("spinbutton");
      userEvent.clear(spinButton);
      userEvent.type(spinButton, "3");
      expect(spinButton).toHaveValue(3);
    });

    it("Leading zeros are removed from amount adjust input on blur", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const spinButton = screen.queryByRole("spinbutton");
      userEvent.clear(spinButton);
      userEvent.type(spinButton, "007");
      userEvent.tab();
      expect(spinButton.value).toEqual("7");
    });

    it("If input is cleared, input resets to 1 on blur", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const spinButton = screen.queryByRole("spinbutton");
      userEvent.clear(spinButton);
      userEvent.tab();
      expect(spinButton.value).toEqual("1");
    });

    it("Changing quantity also changes quantity on cart icon", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const itemsIndicator = screen.getByTestId("items-indicator");
      expect(itemsIndicator.textContent).toEqual("2");

      const spinButton = screen.queryByRole("spinbutton");
      userEvent.clear(spinButton);
      userEvent.type(spinButton, "9");
      userEvent.tab();
      expect(itemsIndicator.textContent).toEqual("9");
    });
  });

  describe.skip("Total Price Tests", () => {
    it("Single item produces correct total", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const label = screen.getByLabelText("total");
      const totalAmount = within(label).queryByText("$96.69");
      expect(totalAmount).toBeInTheDocument();
    });

    it("Same item twice produces correct total", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const label = screen.getByLabelText("total");
      const totalAmount = within(label).queryByText("$193.38");
      expect(totalAmount).toBeInTheDocument();
    });

    it("Two different single items produces correct total", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      goToScreen("shopping_cart");

      const label = screen.getByLabelText("total");
      const totalAmount = within(label).queryByText("$106.68");
      expect(totalAmount).toBeInTheDocument();
    });

    it("Two different items each with quantity of two produces correct total", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      userEvent.click(addCartButtons[1]);
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
