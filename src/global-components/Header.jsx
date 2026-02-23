import { useContext, useEffect, useState } from "react";
import "../css/general.css";
import "../css/header.css";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import LoggedMenu from "./LoggedMenu";
import GuestMenu from "./GuestMenu";

const Header = () => {
	const { isLoggedIn } = useContext(AuthContext);
	const [cartLen, setCartLen] = useState(JSON.parse(localStorage.getItem('cart'))?.length || 0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCartLen(JSON.parse(localStorage.getItem('cart'))?.length)
		}, 1000)

		return () => clearInterval(interval)
	}, [cartLen])
	return (
		<header className="site-header">
			<div className="container">
				<div className="header-inner">
					<div className="header-logo">
						<Link to="/">
							<span className="logo-mark">C</span>
							<span className="logo-text">Clothify</span>
						</Link>
					</div>

					<nav className="header-nav" aria-label="Main navigation">
						<ul className="nav-list">
							<li className="nav-item">
								<Link className="header-link" to="/">
									Home
								</Link>
							</li>

							<li className="nav-item nav-item--has-children">
								<Link className="header-link header-link--parent" to="/products">
									Products
								</Link>
							</li>

							<li className="nav-item nav-item--has-children">
								<Link className="header-link header-link--parent" to="/about">
									About this project
								</Link>
							</li>
						</ul>
					</nav>

					<div className="header-actions">
						<div className="action-with-menu">
							<button
								className="icon-btn icon-btn--user"
								type="button"
								aria-label="Account menu"
							>
								<span className="icon-dot" />
							</button>

							{isLoggedIn ? <LoggedMenu /> : <GuestMenu />}
						</div>

						<Link to="/cart" className="icon-btn icon-btn--cart" aria-label="Cart">
							<span className="icon-dot" />
							<span className="badge">{cartLen || 0}</span>
						</Link>

					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;