import React from 'react'
import { Link } from 'react-router-dom'

const GuestMenu = () => {
    return (
        <div className="action-menu" aria-label="Account submenu">
            <Link to="/login" className="action-menu-link">
                Sign in
            </Link>
            <Link to="/register" className="action-menu-link">
                Register
            </Link>
        </div>
    )
}

export default GuestMenu