import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AppThemeProvider } from './contexts/ThemeContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { APIKeyProvider } from './contexts/APIKeyContext';

// Layout Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy-loaded Pages
const Dashboard = React.lazy(() => import('./components/pages/Dashboard'));
const Settings = React.lazy(() => import('./components/pages/Settings'));
const ContentAnalytics = React.lazy(() => import('./components/pages/ContentAnalytics'));
const SEOTool = React.lazy(() => import('./components/pages/SEOTool'));

function App() {
  return (
    <Router>
      <AppThemeProvider>
        <AccessibilityProvider>
          <APIKeyProvider>
            <CssBaseline />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <main style={{ flexGrow: 1, padding: '20px', transition: 'margin-left 0.3s' }}>
                <Header />
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/content-analytics" element={<ContentAnalytics />} />
                    <Route path="/seo-tool" element={<SEOTool />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
            <ToastContainer />
          </APIKeyProvider>
        </AccessibilityProvider>
      </AppThemeProvider>
    </Router>
  );
}

export default App;
