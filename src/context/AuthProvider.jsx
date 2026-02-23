import { createContext, useEffect, useState } from "react";
import { getUsersApi } from "../api/getUsersApi";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [loggedUser, setLoggedUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
    const [usersList, setUsersList] = useState([]);
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        async function getAllUsers() {
            try {
                const getUsers = await getUsersApi();
                setUsersList(getUsers)
                const logged = getUsers.find(
                    (e) => e.email === localStorage.getItem("loggedUserEmail"),
                );
                if (!logged) {
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("loggedUserEmail")
                    setIsLoggedIn(false);
                } else {
                    setLoggedUser(logged);
                }

            } catch (err) {
                console.log(err.message);
            }
        }
        getAllUsers();
    }, [isLoggedIn, updated]);
    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedUserEmail")
        setIsLoggedIn(false);
        setLoggedUser(null);
        navigate("/");
    }



    return (
        <AuthContext.Provider
            value={{
                accessToken: localStorage.getItem("accessToken"),
                loggedUser: loggedUser,
                logout,
                isLoggedIn,
                setIsLoggedIn,
                usersList,
                updated,
                setUpdated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
