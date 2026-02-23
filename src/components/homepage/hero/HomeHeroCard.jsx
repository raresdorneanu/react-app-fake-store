import { useContext, useState } from "react"
import { ProductsContext } from "../../../context/ProductsContext"

const HomeHeroCard = () => {
    const { allProducts, isLoading } = useContext(ProductsContext)
    const highestPrice = allProducts.reduce((acc, e) => acc < e.price ? acc = e.price : acc, 0)
    const smallestPrice = allProducts.reduce((acc, e) => acc > e.price ? acc = e.price : acc, highestPrice)
    const smallestPriceProduct = allProducts.find((e) => e.price === smallestPrice);
    const [imageError, setImageError] = useState(false);


    return (
        <div className='home-hero-card'>
            <div className="hero-card">
                <div className="hero-card-tag" data-testid="limited-deal">Limited-time deal</div>
                <div className="hero-card-image">
                    <div className="hero-image-placeholder">
                        {
                            isLoading ?
                                <img src="assets/loading-gif.gif" alt="loading" /> : smallestPriceProduct?.images?.[0] && !imageError && (
                                    <img
                                        src={smallestPriceProduct?.images[0]}
                                        alt="product placeholder"
                                        loading="lazy"
                                        onError={() => setImageError(true)}
                                    />
                                )}
                        {imageError && <img src='/assets/no-image.webp' alt='no-image'></img>
                        }

                    </div>
                </div>
                {
                    isLoading ? null :
                        <div className="hero-card-body">
                            <h3 className="hero-card-title" data-testid="product-title">
                                {smallestPriceProduct?.title}
                            </h3>
                            <p className="hero-card-price" data-testid="product-price">{smallestPriceProduct?.price}€</p>
                            <p className="hero-card-note" data-testid="product-description">
                                {smallestPriceProduct?.description}
                            </p>
                        </div>
                }

            </div>
        </div>
    )
}

export default HomeHeroCard
