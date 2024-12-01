import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Divider,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  ColorLens as ThemeIcon,
  DataUsage as DataIcon,
} from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    darkMode: false,
    autoSave: true,
    dataSharing: false,
    language: 'English',
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Settings
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Email Notifications" 
              secondary="Receive email updates about your content and rankings"
            />
            <Switch
              edge="end"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <ThemeIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Dark Mode" 
              secondary="Toggle dark theme for the dashboard"
            />
            <Switch
              edge="end"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Auto-save" 
              secondary="Automatically save changes to content"
            />
            <Switch
              edge="end"
              checked={settings.autoSave}
              onChange={() => handleToggle('autoSave')}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <DataIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Data Sharing" 
              secondary="Share anonymous usage data to help improve the platform"
            />
            <Switch
              edge="end"
              checked={settings.dataSharing}
              onChange={() => handleToggle('dataSharing')}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Language" 
              secondary={settings.language}
            />
            <Button variant="outlined" size="small">
              Change
            </Button>
          </ListItem>
        </List>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
