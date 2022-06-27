import React from "react";
import { render } from "@testing-library/react";
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

describe("Product Card Button", () => {
  const { getByRole } = render(
    <ProductCard
      addToCartClick={(e) => {
        console.log(e);
      }}
      productData={productTestData}
    />
  );
  const cartButton = getByRole("button");

  it("Displays correct msg before click", () => {
    expect(cartButton.textContent).toEqual("Add to Cart");
  });
  it("Displays adding msg after click", () => {
    act(() => {
      userEvent.click(cartButton);
    });
    expect(cartButton.textContent).toEqual("Adding to Cart...");
  });
});
