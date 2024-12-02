import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert
} from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    apiKey: '',
    emailNotifications: true,
    contentAlerts: true,
    rankingAlerts: true,
    darkMode: false
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save settings logic here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            API Configuration
          </Typography>
          <TextField
            fullWidth
            label="Jina AI API Key"
            name="apiKey"
            value={settings.apiKey}
            onChange={handleChange}
            type="password"
            margin="normal"
          />

          <Box sx={{ my: 3 }}>
            <Divider />
          </Box>

          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.emailNotifications}
                onChange={handleChange}
                name="emailNotifications"
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.contentAlerts}
                onChange={handleChange}
                name="contentAlerts"
              />
            }
            label="Content Update Alerts"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.rankingAlerts}
                onChange={handleChange}
                name="rankingAlerts"
              />
            }
            label="Ranking Change Alerts"
          />

          <Box sx={{ my: 3 }}>
            <Divider />
          </Box>

          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.darkMode}
                onChange={handleChange}
                name="darkMode"
              />
            }
            label="Dark Mode"
          />

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Save Settings
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Settings;
