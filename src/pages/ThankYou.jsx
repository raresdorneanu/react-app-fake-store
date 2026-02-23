import { Link } from 'react-router-dom'
import '../css/thank-you.css'

const ThankYou = () => {
    return (
        <main className="ty-page">
            <div className="container ty-container">

                <div className="ty-card">

                    <div className="ty-icon-wrap">
                        <svg className="ty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="url(#ty-gradient)" />
                            <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <defs>
                                <linearGradient id="ty-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#7f5af0" />
                                    <stop offset="1" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <p className="ty-kicker">Order confirmed</p>
                    <h1 className="ty-title">Thank you for your purchase!</h1>
                    <p className="ty-subtitle">
                        Your order has been placed and is being processed. You'll receive a confirmation shortly.
                    </p>

                    <div className="ty-details">
                        <div className="ty-details-row">
                            <span className="ty-details-label">Order status</span>
                            <span className="ty-details-value ty-badge">Processing</span>
                        </div>
                        <div className="ty-details-divider" />
                        <div className="ty-details-row">
                            <span className="ty-details-label">Estimated delivery</span>
                            <span className="ty-details-value">3 – 5 business days</span>
                        </div>
                        <div className="ty-details-divider" />
                        <div className="ty-details-row">
                            <span className="ty-details-label">Payment</span>
                            <span className="ty-details-value">Securely processed ✓</span>
                        </div>
                    </div>

                    <div className="ty-actions">
                        <Link to="/products" className="btn-primary ty-btn">
                            Continue shopping
                        </Link>
                        <Link to="/" className="ty-link">
                            ← Back to home
                        </Link>
                    </div>

                </div>

            </div>
        </main>
    )
}

export default ThankYou
