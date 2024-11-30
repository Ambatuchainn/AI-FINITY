import React, { useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import './Header.css';
import './Footer.css';
import logo from './assets/logo1.png';
import Icplogo from './assets/Icp-logo.png';
import GeneratorForm from './GeneratorForm';
import { loginWithICP, logoutFromICP, LoginResult } from './declarations/backend/LoginUtils';

const App: React.FC = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = useCallback(async () => {
    setLoggingIn(true);

    try {
      const result: LoginResult = await loginWithICP();

      if (result.success) {
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
        await Swal.fire({
          icon: 'warning',
          title: 'Login Failed',
          text: result.error || 'Authentication was unsuccessful.',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#3085d6',
        });

        setUserAuthenticated(false);
      }
    } catch (error) {
      console.error('Unexpected login error:', error);

      await Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred during login.',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#d33',
      });

      setUserAuthenticated(false);
    } finally {
      setLoggingIn(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const result = await logoutFromICP();

      if (result.success) {
        await Swal.fire({
          icon: 'info',
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        setUserAuthenticated(false);
      } else {
        await Swal.fire({
          icon: 'warning',
          title: 'Logout Failed',
          text: result.error || 'Could not log out.',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      
      await Swal.fire({
        icon: 'error',
        title: 'Logout Error',
        text: error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred during logout.',
        confirmButtonText: 'OK',
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Site Logo" className="site-logo" />
        <div className="header-text">
          <h1>DeHockey</h1>
          <p>Play 3D Hockey Game In Web3 Project</p>
        </div>
        {!userAuthenticated ? (
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
        ) : (
          <button
            className="submit-button logout-button"
            onClick={handleLogout}
          >
            <img src={Icplogo} alt="ICP Logo" className="icp-logo" />
            Logout
          </button>
        )}
      </header>
      <main>
        <GeneratorForm 
          isAuthenticated={userAuthenticated}
          onLoginSuccess={() => setUserAuthenticated(true)}
        />
      </main>
      <footer className="footer">
        <img src={Icplogo} alt="ICP Logo" className="icp-logo" />
        <p>Powered by ICP</p>
      </footer>
    </div>
  );
};

export default App;