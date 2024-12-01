import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Content from './components/pages/Content';
import ContentBriefs from './components/pages/ContentBriefs';
import Keywords from './components/pages/Keywords';
import Analytics from './components/pages/Analytics';
import Team from './components/pages/Team';
import Settings from './components/pages/Settings';
import Templates from './components/pages/Templates';
import History from './components/pages/History';
import Notifications from './components/pages/Notifications';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
    background: {
      default: '#f3f4f6',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/content" element={<Content />} />
              <Route path="/briefs" element={<ContentBriefs />} />
              <Route path="/keywords" element={<Keywords />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/team" element={<Team />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
