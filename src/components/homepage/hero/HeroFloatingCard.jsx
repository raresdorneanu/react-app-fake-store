import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider'

const HeroFloatingCard = () => {
    const { usersList } = useContext(AuthContext)
    return (
        <>
            {usersList?.length > 0 && <div className="hero-floating-card">
                <p className="hero-floating-label">Live right now</p>
                <p className="hero-floating-value">
                    {usersList?.length || 0} registered users in our community
                </p>
            </div>}
        </>

    )
}

export default HeroFloatingCard