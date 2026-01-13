import { useState, useEffect } from 'react'
import logo from '/fc_logo1.svg'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav">
            <div className="logo">
              <img src={logo} alt="FlavourCo Logo" className="logo-img" />
            </div>
            <nav className="nav-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Premium Flavors,<br />Extraordinary Experiences</h1>
          <p className="hero-subtitle">Discover our exquisite range of flavors crafted for discerning palates</p>
          <div className="hero-buttons">
            <a href="#products" className="btn btn-primary">Explore Products</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>About FlavourCo</h2>
            <p className="section-subtitle">Crafting excellence in every flavor</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Our Story</h3>
              <p>
                At FlavourCo, we believe that great flavors are the foundation of memorable experiences. 
                Our passion for culinary excellence drives us to source and create the finest flavors 
                that elevate every dish and delight every palate.
              </p>
              <p>
                With years of expertise in the culinary industry, we've built a reputation for quality, 
                innovation, and unwavering commitment to our customers. Every product in our collection 
                is carefully selected and crafted to meet the highest standards.
              </p>
            </div>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">✨</div>
                <h4>Premium Quality</h4>
                <p>Only the finest ingredients and flavors</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌿</div>
                <h4>Natural & Fresh</h4>
                <p>Sourced from trusted suppliers worldwide</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🎯</div>
                <h4>Expert Curation</h4>
                <p>Carefully selected by culinary professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products">
        <div className="container">
          <div className="section-header">
            <h2>Our Products</h2>
            <p className="section-subtitle">Explore our diverse range of premium flavors</p>
          </div>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-icon">🍃</div>
              <h3>Natural Extracts</h3>
              <p>Pure, natural flavor extracts sourced from the finest ingredients around the world.</p>
            </div>
            <div className="product-card">
              <div className="product-icon">🌶️</div>
              <h3>Spice Blends</h3>
              <p>Expertly crafted spice blends that bring depth and complexity to your dishes.</p>
            </div>
            <div className="product-card">
              <div className="product-icon">🍯</div>
              <h3>Artisan Syrups</h3>
              <p>Premium syrups made with natural ingredients for beverages and desserts.</p>
            </div>
            <div className="product-card">
              <div className="product-icon">🧂</div>
              <h3>Seasoning Mixes</h3>
              <p>Professional-grade seasoning mixes for chefs and home cooks alike.</p>
            </div>
            <div className="product-card">
              <div className="product-icon">🍋</div>
              <h3>Citrus Essences</h3>
              <p>Bright, vibrant citrus essences that add freshness to any recipe.</p>
            </div>
            <div className="product-card">
              <div className="product-icon">🌰</div>
              <h3>Nut Flavors</h3>
              <p>Rich, aromatic nut flavors perfect for baking and confectionery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p className="section-subtitle">We'd love to hear from you</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@flavourco.store</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🌐</div>
                <div>
                  <h4>Website</h4>
                  <p>flavourco.store</p>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for your message! We will get back to you soon.');
              e.target.reset();
            }}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <img src={logo} alt="FlavourCo Logo" className="footer-logo" />
              <p style={{ marginTop: '0.5rem' }}>Premium flavors for extraordinary experiences</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <p>Follow us for the latest updates</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} FlavourCo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
