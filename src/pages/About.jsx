import { useState } from "react";
import "../css/about.css";

const About = () => {
  const accordionList = [
    {
      id: 1,
      question: "What is this project?",
      answer:
        "This is a clothing e-commerce app built with React. Users can browse products, view product details, add items to a cart, register, log in, and manage their profile. It was built as a personal learning project to practice React and modern JavaScript.",
      open: true,
    },
    {
      id: 2,
      question: "What state management did you use?",
      answer:
        "I used two approaches. Context API manages the global data that many components need — one context for all the products fetched from the API, and another for the logged-in user and authentication. For the product listing page I used Redux Toolkit, which handles sorting by price, filtering by max price, and searching by name.",
      open: false,
    },
    {
      id: 3,
      question: "How does the cart work?",
      answer:
        "The cart is saved in localStorage so it stays there even after refreshing the page. When a user clicks Add to Cart, a utility function checks if the product is already in the cart — if yes it increases the quantity, if not it adds it as a new item. The cart page uses useReducer to handle actions like remove, increase quantity, and decrease quantity.",
      open: false,
    },
    {
      id: 4,
      question: "How does authentication work?",
      answer:
        "Users can register with a name, email and password. When they log in, the API returns a token that gets saved in localStorage. A Context provider reads that token on load and finds the matching user, making their data available across the whole app. The header shows different menus depending on whether someone is logged in or not.",
      open: false,
    },
    {
      id: 5,
      question: "What other React features did you use?",
      answer:
        "I used React Router for navigation between pages, useReducer for managing form state in the login, register and create product forms, useEffect for fetching data from the API, and useState for smaller local interactions like toggling this accordion. Products also have image error handling with a fallback image.",
      open: false,
    },
  ];

  const [accordion, setAccordion] = useState(accordionList);

  const handleAccordions = (id) => {
    setAccordion((prev) =>
      prev.map((a) => (a.id === id ? { ...a, open: !a.open } : { ...a }))
    );
  };

  const techStack = [
    { label: "React 18", detail: "SPA with hooks & components" },
    { label: "Redux Toolkit", detail: "Product filtering & sorting" },
    { label: "React Router v6", detail: "Client-side navigation" },
    { label: "Context API", detail: "Auth & products global state" },
    { label: "localStorage", detail: "Cart & auth persistence" },
    { label: "REST API", detail: "Live product & user data" },
    { label: "useReducer", detail: "Forms & cart state" },
    { label: "useState / useEffect", detail: "Local state & data fetching" },
  ];

  return (
    <main className="page page-about">
      <section className="section about-hero">
        <div className="container">
          <div className="about-hero-inner">
            <div className="about-hero-text">
              <p className="section-kicker">The project</p>
              <h1 className="about-title">
                A React clothing store,<br />
                <span>built from scratch</span>
              </h1>
              <p className="about-lead">
                This is a personal project I built to practice React. It covers
                things like fetching data from an API, managing state with
                Context and Redux, handling authentication, and building a
                shopping cart that persists across page refreshes.
              </p>
              <p className="about-lead">
                The goal was to build something that feels like a real
                application — with multiple pages, real data, user accounts, and
                a working cart — while learning how to structure a React project
                from the ground up.
              </p>
            </div>

            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat-number">9</span>
                <span className="about-stat-label">Pages</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">15+</span>
                <span className="about-stat-label">Components</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">2</span>
                <span className="about-stat-label">State systems</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">1</span>
                <span className="about-stat-label">REST API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-stack">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Tech used</p>
            <h2 className="section-title">Stack & tools</h2>
            <p className="section-subtitle">
              The main technologies and React features used throughout the project.
            </p>
          </div>

          <div className="stack-grid">
            {techStack.map((item) => (
              <div key={item.label} className="stack-card">
                <p className="stack-name">{item.label}</p>
                <p className="stack-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-faq" id="faq">
        <div className="container">
          <div className="section-header">
            <p className="section-kicker">Q&A</p>
            <h2 className="section-title">About the project</h2>
            <p className="section-subtitle">
              A few questions about how the app was built and what I learned.
            </p>
          </div>

          <div className="faq-list" data-faq>
            {accordion.map((acc) => (
              <article
                key={acc.id}
                className={`faq-item${acc.open ? " is-open" : ""}`}
                data-faq-item
              >
                <button
                  type="button"
                  className="faq-question"
                  data-faq-toggle
                  onClick={() => handleAccordions(acc.id)}
                >
                  {acc.question}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer" data-faq-body>
                  <p>{acc.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
