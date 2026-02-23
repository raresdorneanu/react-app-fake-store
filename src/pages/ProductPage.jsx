import { Link, useParams } from "react-router-dom";
import "../css/product-page.css";
import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import AddToCart from "../utils/AddToCart";

export default function ProductPage() {
    const { productId } = useParams();
    const { allProducts } = useContext(ProductsContext);
    const selectedProduct = allProducts.find((prod) => prod.id === Number(productId));
    const [imageError, setImageError] = useState(false);

    return (
        <main className="product-page">
            <section className="section section-product">
                <div className="container">
                    <nav className="product-breadcrumbs" aria-label="Breadcrumb">
                        <ol className="product-breadcrumbs-list">
                            <li className="product-breadcrumbs-item">
                                <Link className="product-breadcrumbs-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="product-breadcrumbs-sep" aria-hidden="true">
                                /
                            </li>
                            <li className="product-breadcrumbs-item">
                                <Link className="product-breadcrumbs-link" to="/products">
                                    Products
                                </Link>
                            </li>
                            <li className="product-breadcrumbs-sep" aria-hidden="true">
                                /
                            </li>
                            <li className="product-breadcrumbs-item" aria-current="page">
                                <span className="product-breadcrumbs-current">{selectedProduct?.title}</span>
                            </li>
                        </ol>
                    </nav>

                    <div className="product-layout">
                        <div className="product-media">
                            <div className="product-main-image">
                                {selectedProduct?.images?.[0] && !imageError && (

                                    <img
                                        src={selectedProduct?.images[0]}
                                        alt={selectedProduct?.title}
                                        loading="lazy"
                                        onError={() => setImageError(true)}

                                    />
                                )}
                                {imageError && <img src='/assets/no-image.webp' alt='no-image' />}

                            </div>
                        </div>

                        <div className="product-info">
                            <header className="product-header">
                                <p className="product-kicker">{selectedProduct?.category.name}</p>
                                <h1 className="product-title">{selectedProduct?.title}</h1>

                                <div className="product-price-row">
                                    <p className="product-price">{selectedProduct?.price} €</p>
                                    <p className="product-meta">
                                        ID: <strong>{productId}</strong> · Slug: <strong>{selectedProduct?.slug}</strong>
                                    </p>
                                </div>
                            </header>

                            <div className="product-panel">
                                <h2 className="product-panel-title">Description</h2>
                                <p className="product-description">
                                    {selectedProduct?.description}
                                </p>
                            </div>

                            <div className="product-panel">
                                <h2 className="product-panel-title">Details</h2>
                                <ul className="product-details">
                                    <li className="product-detail">
                                        <span className="product-detail-label">Category Name</span>
                                        <span className="product-detail-value">{selectedProduct?.category.name}</span>
                                    </li>
                                    <li className="product-detail">
                                        <span className="product-detail-label">Category Slug</span>
                                        <span className="product-detail-value">{selectedProduct?.category.slug}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="product-actions">
                                <button className="btn-primary" type="button" onClick={() => AddToCart(selectedProduct)}>
                                    Add to cart
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}