import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Zerodha Trading Dashboard</h1>
        <p>Your comprehensive trading platform</p>
      </header>
      
      <main className="main-content">
        <section className="features">
          <div className="feature-card">
            <h2>API Credentials</h2>
            <p>Manage your Zerodha API credentials and authentication</p>
            <Link to="/credentials" className="cta-button">Configure API</Link>
          </div>
          
          <div className="feature-card">
            <h2>Portfolio</h2>
            <p>View and manage your investment portfolio</p>
            <button className="cta-button" disabled>Coming Soon</button>
          </div>
          
          <div className="feature-card">
            <h2>Market Watch</h2>
            <p>Real-time market data and analysis</p>
            <button className="cta-button" disabled>Coming Soon</button>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <p>© 2024 Zerodha Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage; 