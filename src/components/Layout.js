import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import LoadingSpinner from './common/LoadingSpinner';

// Lazy-loaded Pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Settings = React.lazy(() => import('./pages/Settings'));
const ContentAnalytics = React.lazy(() => import('./pages/ContentAnalytics'));
const SEOTool = React.lazy(() => import('./pages/SEOTool'));
const ContentOptimization = React.lazy(() => import('./pages/ContentOptimization'));

const Layout = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Content Analysis', icon: <AnalyticsIcon />, path: '/dashboard/content-analysis' },
    { text: 'Content Optimization', icon: <TuneIcon />, path: '/dashboard/content-optimization' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Content Analytics', icon: <AnalyticsIcon />, path: '/content-analytics' },
    { text: 'SEO Tool', icon: <SEOIcon />, path: '/seo-tool' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar menuItems={menuItems} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin-left 0.3s',
          minHeight: '100vh',
          backgroundColor: theme => theme.palette.background.default
        }}
      >
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/content-analytics" element={<ContentAnalytics />} />
            <Route path="/seo-tool" element={<SEOTool />} />
            <Route path="/dashboard/content-analysis" element={<ContentAnalytics />} />
            <Route path="/dashboard/content-optimization" element={<ContentOptimization />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
