import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AppThemeProvider } from './contexts/ThemeContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
