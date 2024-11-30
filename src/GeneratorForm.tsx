import React, { useCallback } from 'react';
import Swal from 'sweetalert2';
import './GeneratorForm.css';
import { loginWithICP } from './declarations/backend/LoginUtils';

interface GeneratorFormProps {
  isAuthenticated: boolean;
  onLoginSuccess: () => void;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ 
  isAuthenticated, 
  onLoginSuccess 
}) => {
  const handleRedirect = useCallback(async () => {
    if (!isAuthenticated) {
      // Show SweetAlert when not authenticated
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please log in to start the game.',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#3085d6',
      });

      // If user confirms login
      if (result.isConfirmed) {
        try {
          // Attempt to log in
          const loginResult = await loginWithICP();

          if (loginResult.success) {
            // Trigger login success callback
            onLoginSuccess();

            // Redirect to game
            window.location.href = 'https://dehockey.netlify.app/';  //url to the game because we can't connect it to microservice somehow 
          } else {
            // Show login failure alert
            await Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: loginResult.error || 'Could not complete login.',
              confirmButtonText: 'OK',
            });
          }
        } catch (error) {
          // Handle any unexpected errors during login
          await Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'An unexpected error occurred.',
            confirmButtonText: 'OK',
          });
        }
      }
      return;
    }

    // Redirect if already authenticated
    window.location.href = 'https://dehockey.netlify.app/'; //url to the game because we can't connect it to microservice somehow
  }, [isAuthenticated, onLoginSuccess]);

  return (
    <div className="generator-container">
      <p className="form-description">
        Press The Button For Playing The Game
      </p>
      <button
        className="submit-button"
        onClick={handleRedirect}
        disabled={false} // Always enabled, will handle auth internally
        title={isAuthenticated ? 'Start Game' : 'Start Game'}
      >
        {isAuthenticated ? 'Start' : 'Start Game'}
      </button>
    </div>
  );
};

export default GeneratorForm;
