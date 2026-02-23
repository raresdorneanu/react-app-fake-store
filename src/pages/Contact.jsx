import "../css/contact.css";

const Contact = () => {
  return (
    <main className="page page-contact">
      <section className="section contact-hero">
        <div className="container">
          <div className="contact-hero-layout">
            <div className="contact-hero-text">
              <p className="section-kicker">Contact</p>
              <h1 className="section-title">Let&apos;s talk.</h1>
              <p className="section-subtitle">
                Have a question about an order, a product, or just want to send
                us feedback? Fill in the form and we'll get back to you as soon
                as possible.
              </p>
              <div className="contact-meta">
                <p>
                  <span className="contact-meta-label">Email:</span>
                  <span className="contact-meta-value">
                    support@clothify.store
                  </span>
                </p>
                <p>
                  <span className="contact-meta-label">Response time:</span>
                  <span className="contact-meta-value">
                    usually under 24 hours
                  </span>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <form noValidate>
                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Order, product, feedback..."
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="reason">Reason</label>
                  <select
                    id="reason"
                    name="reason"
                  >
                    <option>Order / support</option>
                    <option>Product question</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us a bit more..."
                  />
                </div>

                <div className="form-footer">
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      name="agree"
                    />
                    <span>
                      I agree that Clothify can contact me using the details
                      provided.
                    </span>
                  </label>

                  <button type="submit" className="btn-primary contact-submit">
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
