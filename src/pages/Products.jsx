import "../css/products.css";
import HighlightedProducts from '../components/products/HighlightedPoducts'
import CreateProduct from "../components/products/CreateProduct";



const Products = () => {


  return (
    <main className="page shop-page">
      <HighlightedProducts />
      <CreateProduct />

    </main>
  );
};

export default Products;
