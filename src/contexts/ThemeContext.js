import React, { createContext, useState, useContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create Theme Context
export const ThemeContext = createContext({
  mode: 'light',
  toggleThemeMode: () => {},
});

// Theme Provider Component
export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

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
        text: {
          primary: mode === 'light' ? '#000' : '#fff',
        }
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
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'light' ? '#ffffff' : '#1d1d1d',
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

  // Context value
  const contextValue = {
    mode,
    toggleThemeMode
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for theme context
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  
  return context;
};
