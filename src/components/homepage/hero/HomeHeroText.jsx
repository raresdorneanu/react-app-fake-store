import { useContext } from 'react'
import AuthBar from './AuthBar'
import { AuthContext } from '../../../context/AuthProvider'
import { Link } from 'react-router-dom';

const HomeHeroText = () => {
	const { loggedUser } = useContext(AuthContext);
	return (
		<div className='hero-text-container'>
			<div className="hero-text">
				<p className="hero-kicker">Welcome {loggedUser?.name} · Online marketplace</p>
				<h1 className="hero-title">
					Discover <span>products</span> for everyday life.
				</h1>
				<p className="hero-subtitle">
					From tech and home essentials to fashion and more. Explore items
					added by real people, all in one place.
				</p>

				<div className="hero-actions">
					<Link to="/products" className="btn-primary hero-btn-main">
						Shop now
					</Link>
				</div>

				<div className="hero-meta">
					<div className="hero-meta-item">
						<span className="hero-meta-label">Free shipping</span>
						<span className="hero-meta-value">
							for orders over 150 €
						</span>
					</div>
					<div className="hero-meta-separator" />
					<div className="hero-meta-item">
						<span className="hero-meta-label">Returns</span>
						<span className="hero-meta-value">
							30 days, no questions
						</span>
					</div>
				</div>
				<AuthBar />
			</div>
		</div>
	)
}

export default HomeHeroText
