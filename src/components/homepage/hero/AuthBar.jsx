import { useContext } from "react"
import { AuthContext } from "../../../context/AuthProvider"
import { Link } from "react-router-dom"

const AuthBar = () => {
	const { loggedUser } = useContext(AuthContext)
	return (
		<>
			{loggedUser && <div className="auth-bar">
				<div className="hero-auth hero-auth--logged">
					<div className="hero-auth-avatar">
						<div className="hero-auth-avatar">
							<img
								src={loggedUser?.avatar}
								alt="avatar placeholder"
								loading="lazy"
							/>
						</div>
					</div>
					<div className="hero-auth-main">
						<p className="hero-auth-title">
							Welcome back, {loggedUser.name}
						</p>
						<p className="hero-auth-subtitle">
							You&apos;re signed in · access your account.
						</p>
					</div>
					<div className="hero-auth-meta">
						<span className="hero-auth-dot hero-auth-dot--online" />
						<span className="hero-auth-status">Authenticated</span>
					</div>
					<Link to="/profile" className="hero-auth-link">
						My account
					</Link>
				</div>
			</div>}
		</>
	)
}

export default AuthBar
