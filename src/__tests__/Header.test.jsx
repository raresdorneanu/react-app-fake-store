import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import Header from "../global-components/Header";
import { render, screen } from "@testing-library/react";
import { AuthContext, AuthProvider } from "../context/AuthProvider";

const fakeAuthNotLoggedIn = {
    isLoggedIn: false,
    loggedUser: null,
    logout: () => { },
};

const fakeAuthLoggedIn = {
    isLoggedIn: true,
    loggedUser: { name: "Testing Name" },
    logout: () => { },
};

describe('Header NOT Logged in', () => {
    const headerLinks = ['home', 'products', 'about this project']
    beforeEach(() => {
        localStorage.clear();
        render(
            <AuthContext.Provider value={fakeAuthNotLoggedIn}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </AuthContext.Provider>
        )
    })

    it('should display logo', () => {
        const logo = screen.getByText(/Clothify/i);
        expect(logo).toBeInTheDocument();
    })

    it('should display links', () => {
        headerLinks.forEach(element => {
            expect(screen.getByText(new RegExp(element, 'i'))).toBeInTheDocument();
        });
    })

    it('should NOT display Auth submenu', () => {
        expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument()
    })

    it('should display cart', () => {
        expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument()
    })
})

describe('Header Logged in', () => {
    const headerLinks = ['home', 'products', 'about this project']
    beforeEach(() => {
        localStorage.setItem('accessToken', 'mockAccessToken');
        render(
            <AuthContext.Provider value={fakeAuthLoggedIn}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </AuthContext.Provider>
        )
    })

    it('should display logo', () => {
        const logo = screen.getByText(/Clothify/i);
        expect(logo).toBeInTheDocument();
    })

    it('should display links', () => {
        headerLinks.forEach(element => {
            expect(screen.getByText(new RegExp(element, 'i'))).toBeInTheDocument();
        });
    })

    it('should display Auth submenu', () => {
        expect(screen.getByRole('link', { name: /My Account/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
    })

    it('should display cart', () => {
        expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument()
    })
})