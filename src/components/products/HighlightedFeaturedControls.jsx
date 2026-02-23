import React, { useState } from 'react'
import { setSearchInput } from '../../redux/shopSlice'
import { useDispatch, useSelector } from 'react-redux'

const HighlightedFeaturedControls = ({ startingArr, onSortAscPrice, onSortDescPrice, onFilterByMaxPrice, onResetFilter, onSearchByName }) => {
    const [maxInput, setMaxInput] = useState('')
    const { searchTerm } = useSelector((state) => state.shop)
    const dispatch = useDispatch();
    return (
        <div className="featured-controls">
            <div className="featured-controls-left">
                <p className="featured-controls-label">Sort by price</p>

                <div
                    className="featured-sort"
                    role="group"
                    aria-label="Sort products by price"
                >
                    <button className="tab-button" type="button" aria-pressed="false" onClick={() => onSortDescPrice(startingArr)}>
                        Most expensive
                    </button>
                    <button className="tab-button" type="button" aria-pressed="false" onClick={() => onSortAscPrice(startingArr)}>
                        Cheapest
                    </button>
                    <button className="tab-button" type="button" aria-pressed="false" onClick={onResetFilter}>
                        Reset
                    </button>
                </div>
            </div>

            <div className="featured-controls-right">
                <label className="featured-filter">
                    <span className="featured-controls-label">Max price</span>
                    <div className="featured-filter-row">
                        <input
                            className="cta-input"
                            type="number"
                            min="0"
                            placeholder="e.g. 50"
                            value={maxInput}
                            onChange={(e) => setMaxInput(e.target.value)}
                        />
                        <button className="btn-primary" type="button" onClick={() => onFilterByMaxPrice(maxInput, startingArr)}>
                            Apply
                        </button>
                    </div>
                </label>
            </div>

            <div className="featured-controls-search">
                <label className="featured-filter">
                    <span className="featured-controls-label">Search By Name</span>
                    <div className="featured-filter-row">
                        <input
                            className="cta-input"
                            type="text"
                            placeholder="Search a product..."
                            value={searchTerm}
                            onChange={(e) => dispatch(setSearchInput(e.target.value))}
                        />
                        <button className="btn-primary" type="button" onClick={() => onSearchByName(startingArr)}>
                            Apply
                        </button>
                    </div>
                </label>
            </div>

        </div>
    )
}

export default HighlightedFeaturedControls