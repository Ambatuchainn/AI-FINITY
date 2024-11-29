import React, { useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import './Header.css';
import logo from './assets/logo.png';
import { loginWithICP } from './declarations/backend/LoginUtils';

interface HeaderProps {
  onLoginSuccess?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);

    try {
      const success = await loginWithICP();
      
      if (success) {
        setIsLoggedIn(true);
        onLoginSuccess?.();
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Login Canceled',
          text: 'Please try logging in again.',
          toast: true,
          position: 'top-end'
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error instanceof Error ? error.message : 'An unexpected error occurred',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setIsLoading(false);
    }
  }, [onLoginSuccess]);

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">AI-Powered Hockey Game</h1>
        <p className="subtitle">Play This Hockey Game</p>
      </div>
      <img src={logo} alt="Site Logo" className="site-logo" />
      <div className="header-actions">
        <button 
          type="button" 
          className={`submit-button ${isLoggedIn ? 'logged-in' : ''}`}
          onClick={handleLogin}
          disabled={isLoading || isLoggedIn}
        >
          {isLoading 
            ? "Logging In..." 
            : (isLoggedIn ? "Logged In" : "Login with ICP")
          }
        </button>
      </div>
    </header>
  );
};

export default Header;