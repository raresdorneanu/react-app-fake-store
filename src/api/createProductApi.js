import axios from "axios";

export async function createProductApi(
    title,
    price,
    description,
    categoryId,
    images,
) {
    const body = {
        title,
        price,
        description,
        categoryId,
        images,
    };
    try {
        const data = await axios.post(
            "https://api.escuelajs.co/api/v1/products/",
            body,
            {
                headers: "Content-Type: application/json",
            },
        );
        if (!data) throw new Error("Creating a product failed");
        if (data) {
            return data.data;
        }
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}
