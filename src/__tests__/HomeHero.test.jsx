import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ProductsContext } from "../context/ProductsContext";
import { AuthContext } from "../context/AuthProvider";
import HomeHero from "../components/homepage/HomeHero";
import { MemoryRouter } from "react-router-dom";


const loggedUser = {
    id: 1,
    name: 'mockName',
    email: 'mock@email.test',
    avatar: 'https://placehold.co/600x400'
}

const notLoggedUser = undefined
const prod1 =
{
    "id": 4,
    "title": "Handmade Fresh Table",
    "slug": "handmade-fresh-table",
    "price": 687,
    "description": "Andy shoes are designed to keeping in...",
    "category": {
        "id": 5,
        "name": "Others",
        "image": "https://placehold.co/600x400",
        "slug": "others"
    },
    "images": [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400"
    ]
}

const prod2 =
{
    "id": 5,
    "title": "Handmade Fresh Table 2",
    "slug": "handmade-fresh-table 2",
    "price": 688,
    "description": "Andy shoes are designed to keeping in... 2",
    "category": {
        "id": 4,
        "name": "Others 2",
        "image": "https://placehold.co/600x400 2",
        "slug": "others 2"
    },
    "images": [
        "https://placehold.co/60x60",
        "https://placehold.co/60x60",
        "https://placehold.co/60x60"
    ]
}

const user1 = {
    "id": 1,
    "email": "john@mail.com",
    "password": "changeme",
    "name": "Jhon",
    "role": "customer",
    "avatar": "https://i.imgur.com/LDOO4Qs.jpg"
}

const user2 = {
    "id": 2,
    "email": "test@mail.com",
    "password": "changemetest",
    "name": "Jhont test",
    "role": "customer",
    "avatar": "https://i.imgur.com/LDOO4Qs.jpg"
}

const allProducts = [prod1, prod2]
const isLoading = false
const usersList = [user1, user2]


describe('Home Hero Not Logged In', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ usersList, notLoggedUser }}>
                    <ProductsContext.Provider value={{ allProducts, isLoading }}>
                        <HomeHero />
                    </ProductsContext.Provider>
                </AuthContext.Provider>
            </MemoryRouter>
        )
    })
    it('should display welcome', () => {
        const welcome = screen.getByText(/Welcome · Online marketplace/i)
        expect(welcome).toBeInTheDocument();
    });

    it('should display title', () => {
        const title = screen.getByRole('heading', { name: /Discover products for everyday life/i })
        expect(title).toBeInTheDocument();
    });

    it('should display text', () => {
        const text = screen.getByText(/From tech and home essentials to fashion and more. Explore items added by real people, all in one place/i)
        expect(text).toBeInTheDocument();
    });

    it('should display shop button', () => {
        const button = screen.getByRole('link', { name: /shop now/i })
        expect(button).toBeInTheDocument();
    });

    it('should display meta', () => {
        const meta1 = screen.getByText(/free shipping/i)
        const meta2 = screen.getByText(/returns/i)
        expect(meta1).toBeInTheDocument();
        expect(meta2).toBeInTheDocument();
    });

    it('should display hero card', () => {
        const limited = screen.getByTestId("limited-deal")
        const image = screen.getByAltText("product placeholder")
        const title = screen.getByTestId("product-title")
        const price = screen.getByTestId("product-price")
        const description = screen.getByTestId("product-description")

        expect(limited).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    it('should display floating bar with user count', () => {
        const floatingBar = screen.getByText(
            new RegExp(`${usersList.length} registered users in our community`, 'i')
        )
        expect(floatingBar).toBeInTheDocument();
    });

    it('should NOT display authenticated user details', () => {
        const avatar = screen.queryByAltText("avatar placeholder")
        const name = screen.queryByText(
            new RegExp(`Welcome back, ${loggedUser.name}`, 'i')
        )
        const text = screen.queryByText(/access your account/i)
        const status = screen.queryByText(/authenticated/i)
        const button = screen.queryByRole('link', { name: /my account/i })

        expect(avatar).not.toBeInTheDocument()
        expect(name).not.toBeInTheDocument()
        expect(text).not.toBeInTheDocument()
        expect(status).not.toBeInTheDocument()
        expect(button).not.toBeInTheDocument()
    });
})

describe('Home Hero Logged In', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ usersList, loggedUser }}>
                    <ProductsContext.Provider value={{ allProducts, isLoading }}>
                        <HomeHero />
                    </ProductsContext.Provider>
                </AuthContext.Provider>
            </MemoryRouter>
        )
    })
    it('should display welcome', () => {
        const welcome = screen.getByText(new RegExp(`Welcome ${loggedUser.name} · Online marketplace`, 'i'))
        expect(welcome).toBeInTheDocument();
    });

    it('should display title', () => {
        const title = screen.getByRole('heading', { name: /Discover products for everyday life/i })
        expect(title).toBeInTheDocument();
    });

    it('should display text', () => {
        const text = screen.getByText(/From tech and home essentials to fashion and more. Explore items added by real people, all in one place/i)
        expect(text).toBeInTheDocument();
    });

    it('should display shop button', () => {
        const button = screen.getByRole('link', { name: /shop now/i })
        expect(button).toBeInTheDocument();
    });

    it('should display meta', () => {
        const meta1 = screen.getByText(/free shipping/i)
        const meta2 = screen.getByText(/returns/i)
        expect(meta1).toBeInTheDocument();
        expect(meta2).toBeInTheDocument();
    });

    it('should display hero card', () => {
        const limited = screen.getByTestId("limited-deal")
        const image = screen.getByAltText("product placeholder")
        const title = screen.getByTestId("product-title")
        const price = screen.getByTestId("product-price")
        const description = screen.getByTestId("product-description")

        expect(limited).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    it('should display floating bar with user count', () => {
        const floatingBar = screen.getByText(
            new RegExp(`${usersList.length} registered users in our community`, 'i')
        )
        expect(floatingBar).toBeInTheDocument();
    });

    it('should display authenticated user details', () => {
        const avatar = screen.getByAltText("avatar placeholder")
        const name = screen.getByText(
            new RegExp(`Welcome back, ${loggedUser.name}`, 'i')
        )
        const text = screen.getByText(/access your account/i)
        const status = screen.getByText(/authenticated/i)
        const button = screen.getByRole('link', { name: /my account/i })

        expect(avatar).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(text).toBeInTheDocument()
        expect(status).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    });
})