import {
  act,
  queryAllByRole,
  queryByText,
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
    it("First item img and title are rendered correctly", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      goToScreen("shopping_cart");

      const label = screen.queryAllByRole("heading", { name: /price/i })[0];
      const price = within(label).queryByText(/\$/);
      const image = screen.getByAltText("Toner");
      const title = screen.getByRole("heading", { name: "Toner" });

      expect(image).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(price.textContent).toEqual("$96.69");
    });

    it("Second item img and title are rendered correctly", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      goToScreen("shopping_cart");

      const label = screen.queryAllByRole("heading", { name: /price/i })[1];
      const price = within(label).queryByText(/\$/);
      const image = screen.getByAltText("Plastic Cement");
      const title = screen.getByRole("heading", { name: "Plastic Cement" });

      expect(image).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(price.textContent).toEqual("$9.99");
    });

    it("Quantity adjustment buttons are rendered", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      goToScreen("shopping_cart");

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

    it("When negative number is entered input reverts to last valid input", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const spinButton = screen.queryByRole("spinbutton");
      userEvent.clear(spinButton);
      userEvent.type(spinButton, "-23");
      userEvent.tab();
      expect(spinButton.value).toEqual("3");
    });

    it("When string is entered input reverts to last valid input", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const spinButton = screen.queryByRole("spinbutton");
      userEvent.clear(spinButton);
      userEvent.type(spinButton, "hacker-man");
      userEvent.tab();
      expect(spinButton.value).toEqual("3");
    });

    it("If input is cleared, input reverts to last valid input", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const spinButton = screen.queryByRole("spinbutton");
      userEvent.clear(spinButton);
      userEvent.tab();
      expect(spinButton.value).toEqual("4");
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

  describe("Total Price Tests", () => {
    it("Empty cart shows price of zero", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      goToScreen("shopping_cart");

      const label = screen.getByText(/total/i);
      const totalAmount = within(label).queryByText(/\$/);
      expect(totalAmount.textContent).toEqual("$0.00");
    });

    it("Single item produces correct total", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const label = screen.getByText(/total/i);
      const totalAmount = within(label).queryByText(/\$/);
      expect(totalAmount.textContent).toEqual("$96.69");
    });

    it("Same item twice produces correct total", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[0]);
      goToScreen("shopping_cart");

      const label = screen.getByText(/total/i);
      const totalAmount = within(label).queryByText(/\$/);
      expect(totalAmount.textContent).toEqual("$193.38");
    });

    it("Two different single items produces correct total", () => {
      const addCartButtons = screen.queryAllByRole("button", {
        name: "Add to Cart",
      });
      userEvent.click(addCartButtons[0]);
      userEvent.click(addCartButtons[1]);
      goToScreen("shopping_cart");

      const label = screen.getByText(/total/i);
      const totalAmount = within(label).queryByText(/\$/);
      expect(totalAmount.textContent).toEqual("$106.68");
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

      const label = screen.getByText(/total/i);
      const totalAmount = within(label).queryByText(/\$/);
      expect(totalAmount.textContent).toEqual("$213.36");
    });
  });
});

function goToScreen(name) {
  const shoppingLink = screen.getByRole("link", { name });
  userEvent.click(shoppingLink);
}
