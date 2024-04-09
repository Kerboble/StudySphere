import React from 'react';
import { createRoot } from 'react-dom';
import App from './App.jsx';
import { AuthProvider } from '../authContext.jsx'; // Import the AuthProvider
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the App component with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
