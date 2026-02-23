import axios from "axios";

export default async function updateUserApi(id, email, name, avatar) {
    const body = {
        email: email || undefined,
        name: name || undefined,
        avatar: avatar || undefined,
    };
    try {
        const res = await axios.put(
            `https://api.escuelajs.co/api/v1/users/${id}`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}
