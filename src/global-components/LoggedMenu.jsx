import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Link } from 'react-router-dom'

const LoggedMenu = () => {
    const { logout } = useContext(AuthContext)
    return (
        <div className="action-menu" aria-label="Account submenu">
            <Link to="/profile" className="action-menu-link">
                My Account
            </Link>
            <button onClick={logout} style={{ cursor: "pointer" }} className="action-menu-link">
                Logout
            </button>
        </div>
    )
}

export default LoggedMenu