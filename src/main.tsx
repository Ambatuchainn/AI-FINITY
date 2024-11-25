import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

// Type assertion to tell TypeScript that the element will not be null
const rootElement = document.getElementById('root') as HTMLElement | null;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
