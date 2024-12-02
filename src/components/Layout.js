import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { DashboardOutlined as DashboardIcon, 
         AnalyticsOutlined as AnalyticsIcon,
         TuneOutlined as TuneIcon,
         SettingsOutlined as SettingsIcon } from '@mui/icons-material';

import Header from './Header';
import Sidebar from './Sidebar';
import LoadingSpinner from './common/LoadingSpinner';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Settings = React.lazy(() => import('../pages/Settings'));
const ContentAnalysis = React.lazy(() => import('../pages/ContentAnalysis'));
const ContentOptimization = React.lazy(() => import('../pages/ContentOptimization'));
const ContentAnalytics = React.lazy(() => import('../pages/ContentAnalytics'));
const SEOTool = React.lazy(() => import('../pages/SEOTool'));

const Layout = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Content Analysis', icon: <AnalyticsIcon />, path: '/dashboard/content-analysis' },
    { text: 'Content Optimization', icon: <TuneIcon />, path: '/dashboard/content-optimization' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar menuItems={menuItems} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
          mt: '64px'
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/content-analytics" element={<ContentAnalytics />} />
            <Route path="/seo-tool" element={<SEOTool />} />
            <Route path="/content-analysis" element={<ContentAnalysis />} />
            <Route path="/content-optimization" element={<ContentOptimization />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
