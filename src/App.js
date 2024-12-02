import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import ContentAnalysis from './pages/ContentAnalysis';
import ContentOptimization from './pages/ContentOptimization';
import SEOTool from './pages/SEOTool';
import ContentAnalytics from './pages/ContentAnalytics';
import Preview from './pages/Preview';

// Route Guard Component
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router basename="/seo-dashboard">
          <Routes>
            {/* Public Routes */}
            <Route path="/preview" element={<Preview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route element={<Layout />}>
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/content-analysis" 
                element={
                  <PrivateRoute>
                    <ContentAnalysis />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/content-optimization" 
                element={
                  <PrivateRoute>
                    <ContentOptimization />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/seo-tool" 
                element={
                  <PrivateRoute>
                    <SEOTool />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/content-analytics" 
                element={
                  <PrivateRoute>
                    <ContentAnalytics />
                  </PrivateRoute>
                } 
              />
            </Route>

            {/* Redirect unmatched routes to preview */}
            <Route path="*" element={<Navigate to="/preview" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
