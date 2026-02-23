import { createContext, useEffect, useState } from "react";
import { getProductsApi } from "../api/getProductsApi";

const ProductsContext = createContext();

function ProductsProvider({ children }) {
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function getAllProducts() {
            setIsLoading(true);
            try {
                const products = await getProductsApi();
                setAllProducts(products);
            } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        getAllProducts()
    }, [])
    return <ProductsContext.Provider value={{ allProducts, isLoading }}>{children}</ProductsContext.Provider>
}

export { ProductsContext, ProductsProvider }