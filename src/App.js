import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { WebhookProvider } from './contexts/WebhookContext';
import { APIKeyProvider } from './contexts/APIKeyContext';
import { AppThemeProvider } from './contexts/ThemeContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import EmailVerification from './pages/EmailVerification';
import PasswordReset from './pages/PasswordReset';
import Onboarding from './pages/Onboarding';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Check if email is verified when required
  if (!currentUser.emailVerified && window.location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" />;
  }

  // Check if onboarding is completed
  const onboardingCompleted = localStorage.getItem('onboardingCompleted');
  if (!onboardingCompleted && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

// Public Route wrapper (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <AppThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <UserProvider>
            <WebhookProvider>
              <APIKeyProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
                  <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                  <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
                  <Route path="/reset-password" element={<PublicRoute><PasswordReset /></PublicRoute>} />
                  
                  {/* Email verification */}
                  <Route path="/verify-email" element={<EmailVerification />} />

                  {/* Protected routes */}
                  <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
                  <Route path="/dashboard/*" element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </APIKeyProvider>
            </WebhookProvider>
          </UserProvider>
        </AuthProvider>
      </AppThemeProvider>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
