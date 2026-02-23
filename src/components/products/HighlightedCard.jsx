import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddToCart from '../../utils/AddToCart';

const HighlightedCard = ({ productId, productImage, productCat, productTitle, productPrice, productDescription, product }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <article className="product-card">
            <Link
                className="product-card-link"
                aria-label="View product"
                to={`/products/product/${productId}`}
            >
                <div className="product-card-image">
                    {productImage && !imageError && (
                        <img
                            src={productImage}
                            alt="Deal product"
                            loading="lazy"
                            onError={() => setImageError(true)}
                        />
                    )}
                    {imageError && <img src='/assets/no-image.webp' alt='no-image'></img>}
                    <img
                        src={productImage}
                        alt="Product image"
                        loading="lazy"
                    />
                </div>

                <div className="product-card-body">
                    <p className="product-card-kicker">{productCat}</p>
                    <h3 className="product-card-title">{productTitle}</h3>

                    <div className="product-card-row">
                        <p className="product-card-price">{productPrice} €</p>
                    </div>

                    <p className="product-card-text">{productDescription.split(' ').slice(0, 15).join(' ') + '...'}</p>
                </div>
            </Link>

            <div className="product-card-actions">
                <button className="btn-primary" type="button" onClick={() => AddToCart(product)}>
                    Add to cart
                </button>
            </div>
        </article >
    )
}

export default HighlightedCard