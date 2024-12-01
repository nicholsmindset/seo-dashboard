import React, { useState, useMemo, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import Dashboard from './components/Dashboard';
import Analytics from './components/pages/Analytics';
import ContentBriefs from './components/pages/ContentBriefs';
import Keywords from './components/pages/Keywords';
import Team from './components/pages/Team';
import Settings from './components/pages/Settings';
import Sidebar from './components/Sidebar';
import History from './components/pages/History';
import Notifications from './components/pages/Notifications';
import Header from './components/Header';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy-loaded Pages
const ContentAnalytics = React.lazy(() => import('./components/pages/ContentAnalytics'));
const SEOTool = React.lazy(() => import('./components/pages/SEOTool'));

// Import contexts
import { APIKeyProvider } from './contexts/APIKeyContext';
import { ThemeContext } from './contexts/ThemeContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

function App() {
  const [mode, setMode] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Theme configuration
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: mode,
        primary: {
          main: mode === 'light' ? '#1976d2' : '#90caf9',
        },
        background: {
          default: mode === 'light' ? '#f4f6f8' : '#121212',
          paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
        },
      },
      typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
      },
      components: {
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: mode === 'light' ? '#ffffff' : '#1d1d1d',
              color: mode === 'light' ? '#000' : '#fff',
            }
          }
        }
      }
    }), 
    [mode]
  );

  // Toggle theme mode
  const toggleThemeMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <ThemeContext.Provider value={{ mode, toggleThemeMode }}>
        <AccessibilityProvider>
          <APIKeyProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div style={{ display: 'flex' }}>
                <Sidebar 
                  open={sidebarOpen} 
                  onToggle={() => setSidebarOpen(!sidebarOpen)} 
                />
                <main style={{ flexGrow: 1, padding: '20px', transition: 'margin-left 0.3s', width: `calc(100% - ${sidebarOpen ? 240 : 73}px)`, marginLeft: `${sidebarOpen ? 240 : 73}px` }}>
                  <Header />
                  <Suspense fallback={<LoadingSpinner />}>
                    <Container maxWidth="xl">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/briefs" element={<ContentBriefs />} />
                        <Route path="/keywords" element={<Keywords />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/content-analytics" element={<ContentAnalytics />} />
                        <Route path="/seo-tool" element={<SEOTool />} />
                      </Routes>
                    </Container>
                  </Suspense>
                </main>
              </div>
              <ToastContainer />
            </ThemeProvider>
          </APIKeyProvider>
        </AccessibilityProvider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
