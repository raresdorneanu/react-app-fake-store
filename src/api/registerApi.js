async function registerApi(name, email, password, avatar) {
    const body = {
        name: name,
        email: email,
        password: password,
        avatar: avatar,
    };
    try {
        const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await res.json().then();
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

export default registerApi;
