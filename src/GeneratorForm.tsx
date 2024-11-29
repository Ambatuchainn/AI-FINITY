import React from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2 for alerts
import './GeneratorForm.css'; // Ensure this path is correct
interface GeneratorFormProps {
  isAuthenticated: boolean; // Add isAuthenticated prop
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ isAuthenticated }) => {
  const handleRedirect = () => {
    if (!isAuthenticated) {
      // Show SweetAlert if the user is not authenticated
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: 'You must be logged in to play the game.',
        confirmButtonText: 'OK',
      });
      return;
    }
    window.location.href = 'https://dehockey.netlify.app/'; // Redirects to the provided link
  };

  return (
    <div className="generator-container">
      <p className="form-description">
        Press The Button For Playing The Game
      </p>
      <button
        className="submit-button"
        onClick={handleRedirect}
        disabled={!isAuthenticated} // Disable button if not authenticated
      >
        Start
      </button>
    </div>
  );
};

export default GeneratorForm;
