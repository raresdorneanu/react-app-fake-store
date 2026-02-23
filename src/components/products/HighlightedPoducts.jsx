import React, { useContext, useEffect } from 'react'
import HighlightedCard from './HighlightedCard'
import HighlightedFeaturedControls from './HighlightedFeaturedControls'
import { ProductsContext } from '../../context/ProductsContext'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, setStartingArr, setLoadMore, setSearch, sortAsc, sortDesc, setFilter, setReset } from '../../redux/shopSlice'


const HighlightedPoducts = () => {
    const { allProducts } = useContext(ProductsContext)
    const { productsState, startingArr, searchTerm } = useSelector((state) => state.shop)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProducts(allProducts))
        dispatch(setStartingArr(allProducts.slice(0, 3)))
    }, [allProducts, searchTerm])

    const handleLoadMore = () => {
        dispatch(setLoadMore())
    }

    const handleSearchByName = () => {
        dispatch(setSearch(allProducts))
    }

    const handleSortAscPrice = () => {
        dispatch(sortAsc())
    }

    const handleSortDescPrice = () => {
        dispatch(sortDesc())
    }

    const handleFilterByMaxPrice = (maxInput) => {
        dispatch(setFilter({ maxInput: maxInput, allProducts: allProducts }))
    };

    const handleResetFilter = () => {
        dispatch(setReset(allProducts))
    }

    return (
        <section className="section section-featured">
            <div className="container">
                <div className="section-header">
                    <p className="section-kicker">Featured</p>
                    <h2 className="section-title">Highlighted products</h2>
                    <p className="section-subtitle">
                        Browse our full catalogue. Sort by price, filter by budget, or search by name to find exactly what you're looking for.
                    </p>
                </div>

                <HighlightedFeaturedControls
                    startingArr={startingArr}
                    onResetFilter={handleResetFilter}
                    onSortAscPrice={handleSortAscPrice}
                    onSortDescPrice={handleSortDescPrice}
                    onFilterByMaxPrice={handleFilterByMaxPrice}
                    onSearchByName={handleSearchByName}
                />

                <div className="featured-meta">
                    <p className="section-subtitle">
                        Showing <strong>{startingArr.length}</strong> products
                    </p>
                </div>

                {startingArr.length ? <div className="featured-grid">
                    {startingArr.length > 0 &&
                        startingArr.map((product) => (
                            <HighlightedCard
                                key={product.id}
                                productId={product.id}
                                productImage={product.images[0]}
                                productCat={product.category.name}
                                productTitle={product.title}
                                productPrice={product.price}
                                productDescription={product.description}
                                product={product}
                            />
                        ))}
                </div> : <p className='empty-list-message section-title'>Sorry, we couldn’t find any products that match your search.</p>}

                {startingArr.length !== productsState.length ? <div className="featured-footer">
                    <button className="btn-ghost" type="button" onClick={handleLoadMore}>
                        Load more
                    </button>
                </div> : ''}

            </div>
        </section>
    )
}

export default HighlightedPoducts