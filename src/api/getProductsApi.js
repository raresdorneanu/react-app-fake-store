import axios from "axios";

export async function getProductsApi() {
    try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/products");
        return res.data;
    } catch (err) {
        console.log(err.message);
    }
}
