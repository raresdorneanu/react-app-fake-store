
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../global-components/Footer";
import { beforeEach, describe, expect, it } from "vitest";

describe("Footer", () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );
    });

    it("should render the brand name Clothify", () => {

        const brandName = screen.getByText("Clothify");


        expect(brandName).toBeInTheDocument();
    });

    it("should render the copyright text", () => {

        const copyright = screen.getByText(/© 2026 Clothify/);
        expect(copyright).toBeInTheDocument();
    });

    it("should render the tagline text", () => {
        const tagline = screen.getByText(/curated marketplace/i);

        expect(tagline).toBeInTheDocument();
    });

    it("should render a link to the products page", () => {

        const productsLink = screen.getByRole("link", { name: /all products/i });
        expect(productsLink).toBeInTheDocument();
    });

    it("should render a link to the about page", () => {
        const aboutLink = screen.getByRole("link", { name: /our story/i });
        expect(aboutLink).toBeInTheDocument();
    });

    it("should render the Shop and About section headings", () => {

        const shopHeading = screen.getByRole("heading", { name: /shop/i });
        const aboutHeading = screen.getByRole("heading", { name: /about/i });

        expect(shopHeading).toBeInTheDocument();
        expect(aboutHeading).toBeInTheDocument();
    });

    it("should render the footer element with the correct CSS class", () => {

        const footerEl = document.querySelector("footer.site-footer");
        expect(footerEl).toBeInTheDocument();
    });

    it("the products link should have the correct href", () => {
        const productsLink = screen.getByRole("link", { name: /all products/i });

        expect(productsLink).toHaveAttribute("href", "/products");
    });

    it("the about link should have the correct href", () => {
        const aboutLink = screen.getByRole("link", { name: /our story/i });
        expect(aboutLink).toHaveAttribute("href", "/about");
    });
});
