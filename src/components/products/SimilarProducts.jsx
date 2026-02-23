import React from 'react'

const SimilarProducts = ({ cart, similar, onAddToCart }) => {
    return (
        <>
            {cart?.length > 0 &&
                <section className="cart-cross-sell">
                    <h2 className="cart-cross-sell-title">You may also like</h2>

                    <div className="cart-cross-sell-grid">
                        {similar?.map((e) => <article key={e.id} className="cross-sell-card">
                            <div className="cross-sell-image-placeholder">
                                <img src={e.images[0]} alt={e.title} />
                            </div>
                            <div className="cross-sell-body">
                                <h3 className="cross-sell-title">{e.title}</h3>
                                <p className="cross-sell-price">{e.price} €</p>
                                <button
                                    type="button"
                                    className="btn-secondary cross-sell-add"
                                    data-add-to-cart
                                    onClick={() => onAddToCart(e)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </article>)}

                    </div>
                </section>
            }
        </>
    )
}

export default SimilarProducts