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
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

const Header = () => {
  const muiTheme = useTheme();
  const { isDarkMode, toggleTheme } = useAppTheme();

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={1}
      sx={{
        backgroundColor: muiTheme.palette.background.paper,
        borderBottom: `1px solid ${muiTheme.palette.divider}`,
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
            onClick={toggleTheme}
            color="inherit"
            aria-label={isDarkMode ? 'Toggle light mode' : 'Toggle dark mode'}
          >
            {isDarkMode ? <LightIcon /> : <DarkIcon />}
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="Show notifications"
            sx={{ ml: 1 }}
          >
            <NotificationsIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="Account settings"
            sx={{ ml: 1 }}
          >
            <AccountIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
