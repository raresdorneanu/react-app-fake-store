async function loginApi(email, password) {
    const body = {
        email,
        password,
    };
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error("There was an error while login");
        }

        return data;
    } catch {
        throw Error("There was an error while login");
    }
}

export default loginApi;
