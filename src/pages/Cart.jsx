import { Link, useNavigate } from "react-router-dom";
import "../css/cart.css";
import { useContext, useEffect, useReducer } from "react";
import { ProductsContext } from "../context/ProductsContext";
import AddToCart from "../utils/AddToCart";
import SimilarProducts from "../components/products/SimilarProducts";




function reducer(state, action) {
  switch (action.type) {
    case 'remove':
      return { ...state, cart: state.cart.filter((e) => e.id !== action.payload) }
    case 'increaseQty':
      return { ...state, cart: state.cart.map((e) => e.id === action.payload ? { ...e, quantity: e.quantity + 1 } : e) }
    case 'decreaseQty':
      return { ...state, cart: state.cart.map((e) => e.id === action.payload ? { ...e, quantity: e.quantity - 1 } : e) }
    case 'errorMessage':
      return { ...state, errorMessage: action.payload }
    case 'addToCart':
      if (state.cart.filter((e) => e.id === action.payload.id).length) {
        return { ...state, cart: state.cart.map((e) => e.id === action.payload.id ? { ...e, quantity: e.quantity + 1 } : e) }
      } else return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] }

    default:
      return state;
  }
}

const Cart = () => {
  const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    errorMessage: "",
  };
  const { allProducts } = useContext(ProductsContext);

  const [state, dispatch] = useReducer(reducer, initialState)

  const { cart, errorMessage } = state
  const navigate = useNavigate();

  const findAllCat = {};
  cart.forEach(prod => {
    if (findAllCat[prod?.category?.name]) {
      findAllCat[prod?.category?.name] += 1
    } else {
      findAllCat[prod?.category?.name] = 1
    }
  });

  const findBestCat = Object.entries(findAllCat).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  const similar = allProducts?.filter((e) => e.category.name === findBestCat).slice(0, 3) || [];

  const handleRemove = (id) => {
    dispatch({ type: 'remove', payload: id })
  }

  const handleIncreaseQty = (id) => {
    dispatch({ type: 'increaseQty', payload: id })
  }

  const handleDecreaseQty = (prod, id) => {
    if (prod.quantity === 1) return
    dispatch({ type: 'decreaseQty', payload: id })
  }

  const handleCheckout = () => {
    if (!cart || !cart.length) {
      dispatch({ type: 'errorMessage', payload: "Please add items to cart!" })
      return;
    }
    localStorage.removeItem('cart')
    navigate('/thank-you')
  }

  const handleAddToCart = (prod) => {
    AddToCart(prod);
    dispatch({ type: 'addToCart', payload: prod })
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <main className="cart-page">
      <div className="container cart-container">
        <header className="cart-header">
          <h1 className="cart-title">Your cart</h1>
          <p className="cart-note">
            Items in your cart are not reserved – complete checkout to secure them.
          </p>
        </header>

        <div className="cart-layout">
          <section className="cart-items">
            {cart && cart.map((prod) => (
              <article key={prod?.id} className="cart-item">
                <div className="cart-item-media">
                  <div className="cart-item-image-placeholder">
                    <img src={prod?.images?.[0]} alt={prod?.title} />
                  </div>
                </div>

                <div className="cart-item-content">
                  <div className="cart-item-row">
                    <h2 className="cart-item-title">{prod.title}</h2>
                    <button type="button" className="cart-item-remove" onClick={() => handleRemove(prod.id)}>
                      Remove
                    </button>
                  </div>

                  <p className="cart-item-meta">
                    Category: <span>{prod?.category?.name}</span>
                  </p>

                  <div className="cart-item-row cart-item-row-bottom">
                    <div className="cart-qty">
                      <button type="button" className="cart-qty-btn" onClick={() => handleDecreaseQty(prod, prod?.id)}>–</button>
                      <span className="cart-qty-value">{prod?.quantity}</span>
                      <button type="button" className="cart-qty-btn" onClick={() => handleIncreaseQty(prod?.id)}>+</button>
                    </div>

                    <div className="cart-item-pricing">
                      <p className="cart-item-price">Unit price: <span>{prod.price} €</span></p>
                      <p className="cart-item-subtotal">Subtotal: <span>{prod.price * prod.quantity} €</span></p>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {!cart?.length && (
              <div className="cart-empty">
                <p className="cart-empty-title">Your cart is empty</p>
                <p className="cart-empty-text">Start adding products from the shop page.</p>
                <Link to="/products" className="btn-primary cart-empty-btn">Go to products</Link>
              </div>
            )}
          </section>

          {cart?.length > 0 && (
            <aside className="cart-summary">
              <h2 className="cart-summary-title">Order summary</h2>

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span className="cart-summary-value">{cart?.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)} €</span>
              </div>

              <div className="cart-summary-row">
                <span>Estimated shipping</span>
                <span className="cart-summary-value">Calculated at checkout</span>
              </div>

              <div className="cart-summary-row">
                <span>Discount</span>
                <span className="cart-summary-value">0 €</span>
              </div>

              <div className="cart-summary-divider"></div>

              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span className="cart-summary-value">{cart?.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)} €</span>
              </div>

              <div className="cart-actions">
                <button type="button" className="btn-primary cart-checkout-btn" onClick={handleCheckout}>
                  Proceed to checkout
                </button>
                <Link to="/products" className="cart-continue-link">← Continue shopping</Link>
              </div>

              <p className="cart-secure-note">Your payment is securely processed.</p>
              {errorMessage && <p>{errorMessage}</p>}
            </aside>
          )}
        </div>

        <SimilarProducts cart={cart} similar={similar} onAddToCart={handleAddToCart} />
      </div>
    </main>
  );
};

export default Cart;