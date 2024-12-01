import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { useAppTheme } from '../contexts/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const { mode, toggleThemeMode } = useAppTheme();

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          SEO Content Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={toggleThemeMode}
            color="inherit"
            aria-label={mode === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'}
          >
            {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="Show notifications"
          >
            <NotificationsIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="Account settings"
          >
            <AccountIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
