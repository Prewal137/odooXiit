import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login?signup=true');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="logo">
            <h1>ExpenseFlow</h1>
          </div>
          <nav className="nav-menu">
            <ul>
              <li><a href="#home" className="active">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#about">About</a></li>
              <li><button onClick={handleLogin} className="nav-login-btn">Login</button></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Automate your expense approvals effortlessly</h1>
            <p>
              Streamline your expense management process with our intelligent platform. 
              From submission to approval, we've got you covered with automated workflows 
              and real-time tracking.
            </p>
            <div className="hero-buttons">
              <button onClick={handleGetStarted} className="btn btn-primary">
                Get Started
              </button>
              <button onClick={handleLogin} className="btn btn-secondary">
                Login
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">
              <span>Expense Dashboard Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <h2>Powerful Features</h2>
          <p className="section-subtitle">
            Everything you need to manage expenses efficiently and save time
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Smart Approval Workflow</h3>
              <p>Automated multi-level approval processes with customizable rules and notifications</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📷</div>
              <h3>Receipt OCR</h3>
              <p>Scan receipts to automatically extract expense details and reduce manual entry</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💱</div>
              <h3>Currency Conversion</h3>
              <p>Automatic conversion to your company's base currency with real-time exchange rates</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Fully Responsive</h3>
              <p>Access and manage expenses from any device with our mobile-optimized interface</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Analytics & Reports</h3>
              <p>Gain insights with detailed reports and visual analytics of spending patterns</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Compliant</h3>
              <p>Enterprise-grade security with role-based access and audit trails</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <h2>Trusted by Teams Worldwide</h2>
          <p className="section-subtitle">
            See what our customers have to say about ExpenseFlow
          </p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "ExpenseFlow has transformed how we handle expense approvals. What used to take days now takes minutes!"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SJ</div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Finance Director, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "The OCR feature saves us countless hours. Employees love how easy it is to submit expenses."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">MR</div>
                <div className="author-info">
                  <h4>Michael Rodriguez</h4>
                  <p>Operations Manager, Global Solutions</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "As a manager, I can approve expenses on the go. The mobile experience is exceptional."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">EP</div>
                <div className="author-info">
                  <h4>Emma Patel</h4>
                  <p>Regional Manager, Innovate Inc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Expense Management?</h2>
          <p>
            Join thousands of companies that have streamlined their expense processes with ExpenseFlow
          </p>
          <button onClick={handleGetStarted} className="cta-button">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>ExpenseFlow</h3>
              <p>
                Simplifying expense management for businesses of all sizes with intelligent automation.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Twitter">𝕏</a>
                <a href="#" aria-label="Facebook">f</a>
                <a href="#" aria-label="LinkedIn">in</a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Roadmap</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Guides</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ExpenseFlow. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;