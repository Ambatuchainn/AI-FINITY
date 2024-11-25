import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import './App.css'; // General Styles
import './Header.css'; // Header Styles
import './Footer.css'; // Footer Styles
import './NftPreview.css'; // NFT Generator Section Styles
import './GeneratorForm.css'; // Form Styles
import './Elements.css'; // Button, Inputs, and Other Elements
import logo from './assets/logo1.png'; // Site Logo
import Icplogo from './assets/Icp-logo.png'; // Corrected path for ICP logo
import GeneratorForm from './GeneratorForm'; // Generator Form Component
import { loginWithICP } from './declarations/backend/LoginUtils'; // Login Utility

const App: React.FC = () => {
  const [nftImage, setNftImage] = useState<string | null>(null);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  // Simulate NFT generation with login check
 const handleGenerate = async (description: string, style: string) => {
  if (!userAuthenticated) {
    Swal.fire({
      icon: 'warning',
      title: 'Wallet Not Connected',
      text: 'You must connect your wallet to generate an NFT!',
    });
    return;
  }
  console.log(`Generating NFT with description: "${description}" and style: "${style}"`);
  try {
    // Send the request to the Flask backend
    const response = await axios.post("http://127.0.0.1:4943/generate-nft", {
      prompt: `${description} in ${style} style`, // Use description and style as prompt
    }, { responseType: 'blob' }); // Expecting a blob (image)

    // Create a URL for the image blob and set it in state
    const imageUrl = URL.createObjectURL(response.data);
    setNftImage(imageUrl); // Set the image to display
  } catch (error) {
    console.error("Error generating NFT:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There was an issue generating the NFT. Please try again.',
    });
  }
 };
  
  const handleLogin = async () => {
    try {
      const isAuthenticated = await loginWithICP(); // Trigger ICP login
      setUserAuthenticated(isAuthenticated); // Update authentication status
    } catch (error) {
      console.error("Login failed:", error);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="Site Logo" className="site-logo" />
        <div className="header-text">
          <h1>AI-FINITY</h1>
          <p>Create and mint your NFT in a second</p>
        </div>
        {!userAuthenticated && (
          <button className="submit-button" onClick={handleLogin}>
            <img src={Icplogo} alt="ICP Logo" className="icp-logo" />
            Login
          </button>
        )}
      </header>
      <main>
        <div className="nft-generator-container">
          <GeneratorForm onGenerate={handleGenerate} />
          {nftImage && (
            <div className="nft-image-container">
              <img
                src={nftImage}
                alt="Generated NFT"
                className="nft-image"
              />
            </div>
          )}
        </div>
      </main>
      <footer className="footer">
        <img src={Icplogo} alt="ICP Logo" className="icp-logo" />
        <p>Powered by ICP</p>
      </footer>
    </div>
  );
}

export default App;
