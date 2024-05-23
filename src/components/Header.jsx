import React from 'react';
import image from '../assets/products/banner-bg.png' // Importing banner background image

// Header Component
const Header = () => {
  // Styling for header section
  const headerStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '400px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
  };

  return (
    // Header section with styled background and content
    <header style={headerStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Welcome to Our E-Commerce Store</h1>
            <p className="lead">
              Explore our amazing collection of products.
            </p>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header; // Exporting Header component
