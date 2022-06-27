import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ProductCard from "../components/product-card";
import userEvent from "@testing-library/user-event";

const productTestData = {
  title: "Toner",
  price: "$96.69",
  description: "Black like oil but more expensive!",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Toner-container-black-0a.jpg/320px-Toner-container-black-0a.jpg",
};

it("Displays correct msg before click", () => {
  render(<ProductCard productData={productTestData} />);
  const cartButton = screen.getByRole("button");
  expect(cartButton.textContent).toEqual("Add to Cart");
});

it("Displays adding msg after click", () => {
  render(<ProductCard productData={productTestData} />);
  const cartButton = screen.getByRole("button");
  userEvent.click(cartButton);
  expect(cartButton.textContent).toEqual("Adding to Cart...");
});

it("Resets msg after 1000ms", async () => {
  jest.useFakeTimers();

  act(() => {
    render(<ProductCard productData={productTestData} />);
  });
  const cartButton = screen.getByRole("button");
  userEvent.click(cartButton);
  await act(async () => {
    jest.advanceTimersByTime(1100);
  });
  expect(cartButton.textContent).toEqual("Add to Cart");
});
