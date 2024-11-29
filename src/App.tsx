import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css'; // General Styles
import './Header.css'; // Header Styles
import './Footer.css'; // Footer Styles
import logo from './assets/logo1.png'; // Site Logo
import Icplogo from './assets/Icp-logo.png'; // ICP Logo
import GeneratorForm from './GeneratorForm'; // Generator Form Component
import { loginWithICP } from './declarations/backend/LoginUtils'; // Login Utility

const App: React.FC = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async () => {
    setLoggingIn(true);

    try {
      const isAuthenticated = await loginWithICP();

      if (isAuthenticated) {
        // Show success alert
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You are now logged in.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        setUserAuthenticated(true);
      } else {
        // Handle login canceled by user
        await Swal.fire({
          icon: 'warning',
          title: 'Login Canceled',
          text: 'Please log in again to access the game.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });

        setUserAuthenticated(false);
      }
    } catch (error) {
      // Show error alert
      console.error('Login failed:', error);

      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error instanceof Error ? error.message : 'Authentication failed. Please try again.',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#d33',
        footer: '<a href="#">Need help?</a>',
      });

      setUserAuthenticated(false);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Site Logo" className="site-logo" />
        <div className="header-text">
          <h1>DeHockey</h1>
          <p>Play 3D Hockey Game In Web3 Project</p>
        </div>
        {!userAuthenticated && (
          <button
            className="submit-button"
            onClick={handleLogin}
            disabled={loggingIn}
          >
            {loggingIn ? (
              'Logging...'
            ) : (
              <>
                <img src={Icplogo} alt="ICP Logo" className="icp-logo" />
                Login
              </>
            )}
          </button>
        )}
      </header>
      <main>
        <GeneratorForm isAuthenticated={userAuthenticated} />
      </main>
      <footer className="footer">
        <img src={Icplogo} alt="ICP Logo" className="icp-logo" />
        <p>Powered by ICP</p>
      </footer>
    </div>
  );
};

export default App;
