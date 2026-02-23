import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import SimilarProducts from "../components/products/SimilarProducts";
import { beforeEach, describe, expect, it, vi } from "vitest";

const fakeProduct1 = {
    id: 1,
    title: "Wireless Headphones",
    price: 79,
    images: ["https://example.com/headphones.jpg"],
    category: { name: "Electronics" },
};

const fakeProduct2 = {
    id: 2,
    title: "Running Shoes",
    price: 120,
    images: ["https://example.com/shoes.jpg"],
    category: { name: "Sports" },
};

const fakeSimilarProducts = [fakeProduct1, fakeProduct2];


const fakeCart = [{ id: 99, title: "Some cart item", quantity: 1 }];


describe("SimilarProducts", () => {


    describe("when the cart is empty", () => {

        it("should NOT render the section at all", () => {
            render(
                <SimilarProducts
                    cart={[]}
                    similar={fakeSimilarProducts}
                    onAddToCart={() => { }}
                />
            );


            const section = screen.queryByText(/you may also like/i);

            expect(section).not.toBeInTheDocument();
        });

        it("should NOT render the section when cart is null", () => {
            render(
                <SimilarProducts
                    cart={null}
                    similar={fakeSimilarProducts}
                    onAddToCart={() => { }}
                />
            );

            const section = screen.queryByText(/you may also like/i);
            expect(section).not.toBeInTheDocument();
        });
    });


    describe("when the cart has items", () => {

        let mockOnAddToCart;

        beforeEach(() => {

            mockOnAddToCart = vi.fn();

            render(
                <SimilarProducts
                    cart={fakeCart}
                    similar={fakeSimilarProducts}
                    onAddToCart={mockOnAddToCart}
                />
            );
        });

        it("should render the 'You may also like' heading", () => {
            const heading = screen.getByText(/you may also like/i);
            expect(heading).toBeInTheDocument();
        });

        it("should render all product titles", () => {
            expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
            expect(screen.getByText("Running Shoes")).toBeInTheDocument();
        });

        it("should render prices with the euro symbol", () => {
            expect(screen.getByText(/79 €/)).toBeInTheDocument();
            expect(screen.getByText(/120 €/)).toBeInTheDocument();
        });

        it("should render an 'Add to cart' button for each product", () => {
            const buttons = screen.getAllByRole("button", { name: /add to cart/i });
            expect(buttons).toHaveLength(2);
        });

        it("should render product images with correct alt text", () => {
            const img1 = screen.getByAltText("Wireless Headphones");
            const img2 = screen.getByAltText("Running Shoes");

            expect(img1).toBeInTheDocument();
            expect(img2).toBeInTheDocument();
        });

        it("should call onAddToCart with the correct product when clicking 'Add to cart'", async () => {

            const user = userEvent.setup();

            const buttons = screen.getAllByRole("button", { name: /add to cart/i });
            await user.click(buttons[0]);

            expect(mockOnAddToCart).toHaveBeenCalledWith(fakeProduct1);
        });

        it("should call onAddToCart with the second product when clicking its button", async () => {
            const user = userEvent.setup();

            const buttons = screen.getAllByRole("button", { name: /add to cart/i });
            await user.click(buttons[1]);
            expect(mockOnAddToCart).toHaveBeenCalledWith(fakeProduct2);
        });

        it("should call onAddToCart exactly once per click", async () => {
            const user = userEvent.setup();

            const buttons = screen.getAllByRole("button", { name: /add to cart/i });
            await user.click(buttons[0]);

            expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
        });
    });
});
