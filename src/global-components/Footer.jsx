import { Link } from "react-router-dom";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-mark footer-logo-mark">C</span>
            <span className="logo-text">Clothify</span>
          </div>
          <p className="footer-text">
            A curated marketplace for quality products across every category.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/products">All products</Link></li>
            </ul>
          </div>

          <div>
            <h4>About</h4>
            <ul>
              <li><Link to="/about">Our story</Link></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 Clothify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
