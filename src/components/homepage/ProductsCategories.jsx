import React, { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext';

const ProductsCategories = () => {
    const { allProducts } = useContext(ProductsContext);
    const mainArr = [];
    let findings = {};
    allProducts.forEach((e) => {
        if (findings[e.category.name] === undefined) {
            findings[e.category.name] = 1;
        } else {
            findings[e.category.name]++
        }
    })
    const onlyFour = Object.entries(findings).slice().sort((a, b) => b[1] - a[1]).slice(0, 4).map((e) => e[0])
    const filteredProductsByHighestCat = allProducts.filter((e) => onlyFour.includes(e.category.name))

    onlyFour.forEach(e => {
        const catProducts = filteredProductsByHighestCat.filter((x) => x.category.name === e);
        mainArr.push(catProducts);
    })

    return (
        <section className="section section-categories">
            <div className="container">
                <div className="section-header">
                    <p className="section-kicker">Explore by category</p>
                    <h2 className="section-title">Browse popular picks</h2>
                    <p className="section-subtitle">
                        Discover our most popular categories. From everyday essentials to unique finds — something for everyone.
                    </p>
                </div>

                <div className="category-grid">
                    {mainArr.map((box) => <article key={box[0].category.id} className="category-card">
                        <header className="category-card-header">
                            <div className="category-meta">
                                <h3 className="category-title">{box[0].category.name}</h3>
                                <p className="category-count">{box.length} products · {box.reduce((acc, e) => acc > e.price ? acc = e.price : acc, 99999999999)}€ – {box.reduce((acc, e) => acc < e.price ? acc = e.price : acc, 0)}€</p>
                            </div>
                        </header>

                        <div className="category-body">
                            <div className="category-image">
                                <img
                                    src={box[0].category.image}
                                    alt="Sample electronics product"
                                    loading="lazy"
                                />
                            </div>
                            <p className="category-text">
                                {box[0].description.split(' ').slice(0, 15).join(' ') + '...'}
                            </p>
                        </div>
                    </article>)}
                </div>
            </div>
        </section>
    )
}

export default ProductsCategories