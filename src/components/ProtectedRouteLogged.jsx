import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRouteLogged = ({ children }) => {
    const user = localStorage.getItem("accessToken");
    if (user) {
        return <Navigate to="/profile" replace />
    }
    return children
}

export default ProtectedRouteLogged