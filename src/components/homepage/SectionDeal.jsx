import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../../context/ProductsContext'
import { Link } from 'react-router-dom';

const SectionDeal = () => {
    const { allProducts, isLoading } = useContext(ProductsContext)
    const [randomProduct, setRandomProduct] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [productId, setProductId] = useState(null);

    useEffect(() => {
        if (!isLoading && allProducts && allProducts.length > 0 && !randomProduct) {
            const randomIndex = Math.floor(Math.random() * allProducts.length);
            const product = allProducts[randomIndex];
            setRandomProduct(product);
            setImageError(false);
            setProductId(product?.id)
        }
    }, [allProducts, isLoading, randomProduct]);

    const handleChangeProduct = () => {
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        const product = allProducts[randomIndex];
        setRandomProduct(product);
        setImageError(false);
        setProductId(product?.id)
    }
    return (
        <section className="section section-deal">
            <div className="container">
                <div className="section-header">
                    <p className="section-kicker">Pick of the moment</p>
                    <h2 className="section-title">One product you shouldn&apos;t miss</h2>

                </div>

                <div className="deal-layout">
                    <div className="deal-image">
                        <div className="deal-card">
                            <div className="deal-card-media">
                                {randomProduct?.images?.[0] && !imageError && (
                                    <img
                                        src={randomProduct.images[0]}
                                        alt="Deal product"
                                        loading="lazy"
                                        onError={() => setImageError(true)}
                                    />
                                )}
                                {imageError && <img src='/assets/no-image.webp' alt='no-image'></img>}
                            </div>
                            <div className="deal-card-badge">Random pick</div>
                        </div>
                    </div>

                    <div className="deal-content">
                        <h3 className="deal-title">{randomProduct?.title}</h3>
                        <p className="deal-price">{randomProduct?.price} €</p>

                        <div className="deal-info">
                            <span className="deal-pill">{randomProduct?.category.name}</span>
                            <span className="deal-pill">{randomProduct?.price <= 50 ? 'Great value' : 'Premium'}</span>
                        </div>


                        <p className="deal-description">
                            {randomProduct?.description.split(' ').slice(0, 15).join(' ') + '...'}
                        </p>

                        <div className="deal-actions">
                            <button className="btn-primary" type="button" onClick={handleChangeProduct}>
                                Shuffle product
                            </button>
                            <Link className="btn-ghost" type="button" to={`products/product/${productId}`}>
                                View details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionDeal