import "../css/home.css";
import HomeHero from "../components/homepage/HomeHero";
import ProductsCategories from "../components/homepage/ProductsCategories";
import SectionDeal from "../components/homepage/SectionDeal";

const Home = () => {
	return (
		<main className="homepage">
			<HomeHero />

			<ProductsCategories />


			<SectionDeal />

		</main>
	);
};

export default Home;