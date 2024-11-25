import React, { useState } from 'react';
import './Header.css';
import logo from './assets/logo.png';
import { loginWithICP } from './declarations/backend/LoginUtils'; // Ensure this function is correctly defined

const Header: React.FC = () => {
  // Track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Handle ICP login
  const handleLogin = async () => {
    try {
      await loginWithICP(); // Trigger ICP login
      setIsLoggedIn(true); // Update state when logged in
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <header>
      <div className="header-content">
        <h1 className="title">AI-Powered NFT Generator</h1>
        <p className="subtitle">Create and mint art in a minute with ease</p>
      </div>
      <img src={logo} alt="Site Logo" className="site-logo" />
      <div className="header-actions">
        {/* Conditionally render button based on login state */}
        <button 
          type="button" 
          className="submit-button" 
          onClick={handleLogin}
        >
          {isLoggedIn ? "Logged In" : "Login with ICP"}
        </button>
      </div>
    </header>
  );
};

export default Header;
