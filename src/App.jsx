import { useState, useEffect } from 'react'
import logo from '/trans.png'
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

  const products = [
    {
      id: 1,
      name: 'Frozen Chicken Shami Kabab',
      description: 'Delicious homemade chicken shami kababs, perfectly spiced and ready to cook',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=400&fit=crop&q=80',
      category: 'Chicken'
    },
    {
      id: 2,
      name: 'Frozen Alu Cutlets',
      description: 'Crispy potato cutlets with aromatic spices, made with love at home',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop&q=80',
      category: 'Vegetarian'
    },
    {
      id: 3,
      name: 'Spring Rolls',
      description: 'Fresh spring rolls with vegetables, crispy and golden when fried',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&q=80',
      category: 'Vegetarian'
    },
    {
      id: 4,
      name: 'Alu Masala Rolls',
      description: 'Spiced potato rolls wrapped in flaky pastry, perfect for snacks',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=400&fit=crop&q=80',
      category: 'Vegetarian'
    },
    {
      id: 5,
      name: 'Alu Samosa',
      description: 'Classic triangular samosas filled with spiced potatoes',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop&q=80',
      category: 'Vegetarian'
    },
    {
      id: 6,
      name: 'Chicken Samosa',
      description: 'Crispy samosas filled with tender spiced chicken',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop&q=80',
      category: 'Chicken'
    },
    {
      id: 7,
      name: 'Chicken Cheese Samosa',
      description: 'Delicious samosas with chicken and melted cheese filling',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop&q=80',
      category: 'Chicken'
    }
  ]

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
          <h1 className="hero-title">Premium Homemade<br />Frozen Foods</h1>
          <p className="hero-subtitle">Authentic flavors, made with love, frozen fresh for your convenience</p>
          <div className="hero-buttons">
            <a href="#products" className="btn btn-primary">Explore Products</a>
            <a href="#contact" className="btn btn-secondary">Order Now</a>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>About FlavourCo</h2>
            <p className="section-subtitle">Homemade goodness, frozen fresh</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Our Story</h3>
              <p>
                At FlavourCo, we believe that great food starts with great ingredients and even greater care. 
                Our frozen food products are made fresh in our kitchen using traditional recipes passed down 
                through generations, then carefully frozen to preserve their authentic flavors and freshness.
              </p>
              <p>
                Every item is handcrafted with love, ensuring that when you cook our products, you experience 
                the same delicious taste and quality as if they were made fresh in your own kitchen.
              </p>
            </div>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">🏠</div>
                <h4>Homemade Quality</h4>
                <p>All products made fresh in our kitchen</p>
              </div>
              <div className="feature">
                <div className="feature-icon">❄️</div>
                <h4>Frozen Fresh</h4>
                <p>Flash frozen to lock in flavor and nutrients</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌿</div>
                <h4>Natural Ingredients</h4>
                <p>No preservatives, just pure authentic flavors</p>
              </div>
              <div className="feature">
                <div className="feature-icon">👨‍🍳</div>
                <h4>Expert Crafted</h4>
                <p>Made by experienced home chefs</p>
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
            <p className="section-subtitle">Discover our range of delicious frozen foods</p>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-badge">{product.category}</div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button className="btn btn-product">Order Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p className="section-subtitle">Place your order or ask us anything</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+92 339 0791989</p>
                </div>
              </div>
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
                <input type="tel" placeholder="Your Phone" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message or Order Details" rows="5" required></textarea>
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
              <p>Premium homemade frozen foods, made with love and care</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-section">
              <h4>Products</h4>
              <a href="#products">Chicken Items</a>
              <a href="#products">Vegetarian Items</a>
              <a href="#products">All Products</a>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <p>Follow us for updates and special offers</p>
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
