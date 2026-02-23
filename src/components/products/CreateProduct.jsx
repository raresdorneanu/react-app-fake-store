import React from 'react'
import { useReducer } from "react";
import { createProductApi } from "../../api/createProductApi"
function reducer(state, action) {
    switch (action.type) {
        case 'setField':
            return { ...state, [action.field]: action.field === 'images' ? [action.value] : action.value }
        case 'message':
            return { ...state, message: action.payload }
        case 'reset':
            return {
                title: "",
                price: undefined,
                description: "",
                categoryId: undefined,
                images: ["https://placehold.co/600x400"],
                message: "",
            }
        default:
            throw new Error("unknown action type")
    }
}
const initialState = {
    title: "",
    price: undefined,
    description: "",
    categoryId: undefined,
    images: ["https://placehold.co/600x400"],
    message: "",
}
const CreateProduct = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { title, price, description, categoryId, images, message } = state;

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (!title && !price && !description && !categoryId) {
            dispatch({ type: 'message', payload: "All Fields Must Be Completed!" });
            return
        }
        try {
            const data = await createProductApi(title, price, description, categoryId, images)
        } catch (err) {
        }
    }

    const handleReset = () => {
        dispatch({ type: 'reset' })
        const body = {
            title, price, description, categoryId, images
        }
    }
    return (
        <section className="section create-product-section">
            <div className="container">
                <div className="create-product-header">
                    <h2 className="section-title">Create New Product</h2>
                    <p className="section-subtitle">Add a new product to the catalog</p>
                </div>

                <div className="create-product-form-wrapper">
                    <form className="create-product-form">
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">Product Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-input"
                                placeholder="Enter product title"
                                value={title}
                                onChange={(e) => dispatch({ type: 'setField', field: 'title', value: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price" className="form-label">Price (EUR)</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="form-input"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                value={price}
                                onChange={(e) => dispatch({ type: 'setField', field: 'price', value: Number(e.target.value) })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-textarea"
                                placeholder="Enter product description"
                                rows="4"
                                value={description}
                                onChange={(e) => dispatch({ type: 'setField', field: 'description', value: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoryId" className="form-label">Category ID</label>
                            <input
                                type="number"
                                id="categoryId"
                                name="categoryId"
                                className="form-input"
                                placeholder="Enter category ID"
                                value={categoryId}
                                onChange={(e) => dispatch({ type: 'setField', field: 'categoryId', value: Number(e.target.value) })}
                            />
                            <span className="form-hint">Enter a number between 1 and 5</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="images" className="form-label">Image URL</label>
                            <input
                                type="url"
                                id="images"
                                name="images"
                                className="form-input"
                                placeholder="https://example.com/image.jpg"
                                value={images}
                                onChange={(e) => dispatch({ type: 'setField', field: 'images', value: e.target.value })}
                            />
                            <span className="form-hint">Enter a valid image URL</span>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-submit" onClick={handleCreateProduct}>
                                Create Product
                            </button>
                            <button type="reset" className="btn-reset" onClick={handleReset}>
                                Reset Form
                            </button>
                        </div>
                        {message && <p className="create-prod-message">{message}</p>}

                    </form>
                    <div className="form-preview">
                        <h3 className="preview-title">Preview</h3>
                        <div className="preview-card">
                            <div className="preview-image">
                                <img src={images?.length ? images : "https://placehold.co/600x400"} alt="Product preview" />
                            </div>
                            <div className="preview-body">
                                <p className="preview-category">Category {categoryId ? categoryId : '1'}</p>
                                <h4 className="preview-product-title">{title ? title : 'New Product'}</h4>
                                <p className="preview-price">{price ? price + ' €' : '100 €'}</p>
                                <p className="preview-description">{description ? description : 'A description'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateProduct