// ============================================================
// WHAT IS THIS FILE?
// A test file for the Footer component.
// Test files always end in .test.jsx (or .test.js)
// Vitest automatically finds and runs all *.test.* files.
// ============================================================

// --- IMPORTS ---
// We import "render" to put our component on a fake screen (jsdom).
// We import "screen" to look at what's on that fake screen.
import { render, screen } from "@testing-library/react";

// Footer uses <Link> from react-router-dom, which needs a Router
// context to work. MemoryRouter is the simplest one for tests.
import { MemoryRouter } from "react-router-dom";

// The component we are testing.
import Footer from "../global-components/Footer";
import { beforeEach, describe, expect, it } from "vitest";

// ============================================================
// WHAT IS describe()?
// "describe" groups related tests together under one name.
// Think of it like a folder or a section title.
// Syntax: describe("group name", () => { ... tests go here ... })
// ============================================================
describe("Footer", () => {

    // ============================================================
    // WHAT IS beforeEach()?
    // Code inside beforeEach() runs automatically before EVERY test
    // in this describe block. It's useful for setup steps you always
    // need, so you don't repeat yourself.
    //
    // Here we render the Footer once before each test so every test
    // gets a fresh, clean render.
    //
    // render(<Footer />) puts the component into a fake browser DOM
    // (provided by jsdom). It doesn't open a real browser window.
    // ============================================================
    beforeEach(() => {
        render(
            // Footer uses <Link to="/products">, which needs a Router.
            // Wrapping with MemoryRouter satisfies that requirement.
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );
    });

    // ============================================================
    // WHAT IS it() / test()?
    // "it" (same as "test") defines a single test case.
    // The first argument is a description of what you're checking.
    // The second argument is a function with your test code.
    //
    // A good description finishes the sentence: "it should..."
    // Syntax: it("should do something", () => { ... })
    // ============================================================

    it("should render the brand name Clothify", () => {
        // ============================================================
        // WHAT IS screen.getByText()?
        // It searches the fake DOM for an element that contains
        // the given text. If it finds it, the test passes that line.
        // If it DOESN'T find it, the test throws an error and fails.
        //
        // Other similar queries:
        //   screen.getByRole()   - finds by ARIA role (button, heading, link...)
        //   screen.getByAltText() - finds by image alt text
        //   screen.queryByText() - like getByText but returns null instead of throwing
        //   screen.getAllByText() - finds ALL matching elements (returns array)
        // ============================================================
        const brandName = screen.getByText("Clothify");

        // ============================================================
        // WHAT IS expect()?
        // "expect" is how you make an assertion — you say what you
        // EXPECT to be true. If it's not true, the test fails.
        //
        // Syntax: expect(something).matcher()
        //
        // WHAT IS .toBeInTheDocument()?
        // This is a matcher from @testing-library/jest-dom.
        // It checks that the element actually exists in the fake DOM.
        // ============================================================
        expect(brandName).toBeInTheDocument();
    });

    it("should render the copyright text", () => {
        // getByText also accepts a regex (regular expression).
        // /Clothify/ means "any text that contains the word Clothify".
        // This is useful when you don't know the exact full string.
        const copyright = screen.getByText(/© 2026 Clothify/);
        expect(copyright).toBeInTheDocument();
    });

    it("should render the tagline text", () => {
        const tagline = screen.getByText(/curated marketplace/i);
        // The "i" flag inside /.../ means case-insensitive.
        // So it would match "Curated Marketplace" or "CURATED MARKETPLACE" too.
        expect(tagline).toBeInTheDocument();
    });

    it("should render a link to the products page", () => {
        // ============================================================
        // WHAT IS screen.getByRole()?
        // The best way to find links and buttons.
        // "link" is the role for <a> elements.
        // "button" is the role for <button> elements.
        // "heading" is the role for <h1>, <h2>, etc.
        //
        // { name: "..." } narrows it down by the visible text of the element.
        // ============================================================
        const productsLink = screen.getByRole("link", { name: /all products/i });
        expect(productsLink).toBeInTheDocument();
    });

    it("should render a link to the about page", () => {
        const aboutLink = screen.getByRole("link", { name: /our story/i });
        expect(aboutLink).toBeInTheDocument();
    });

    it("should render the Shop and About section headings", () => {
        // getByRole("heading") matches <h1>, <h2>, <h3>, etc.
        // { name: /shop/i } means the heading's text contains "shop".
        const shopHeading = screen.getByRole("heading", { name: /shop/i });
        const aboutHeading = screen.getByRole("heading", { name: /about/i });

        expect(shopHeading).toBeInTheDocument();
        expect(aboutHeading).toBeInTheDocument();
    });

    it("should render the footer element with the correct CSS class", () => {
        // ============================================================
        // WHAT IS document.querySelector()?
        // This is regular JavaScript DOM selection — it searches the
        // rendered HTML for an element matching a CSS selector.
        // Use this when there's no better role or text to search by.
        // ============================================================
        const footerEl = document.querySelector("footer.site-footer");
        expect(footerEl).toBeInTheDocument();
    });

    it("the products link should have the correct href", () => {
        const productsLink = screen.getByRole("link", { name: /all products/i });

        // ============================================================
        // WHAT IS .toHaveAttribute()?
        // Checks that an element has a specific HTML attribute
        // with a specific value.
        // Here we confirm the link points to "/products".
        // ============================================================
        expect(productsLink).toHaveAttribute("href", "/products");
    });

    it("the about link should have the correct href", () => {
        const aboutLink = screen.getByRole("link", { name: /our story/i });
        expect(aboutLink).toHaveAttribute("href", "/about");
    });
});
