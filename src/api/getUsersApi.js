export async function getUsersApi() {
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/users");
        const data = await res.json();
        if (!res.ok) throw new Error("Error Fetching All Users");
        return data;
    } catch (err) {
        console.log(err.message);
    }
}
