import React, { useState, useEffect } from 'react';
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
  Alert,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    apiKeys: {
      jinaAI: process.env.REACT_APP_JINA_API_KEY || '',
      openAI: process.env.REACT_APP_OPENAI_API_KEY || '',
      claude: process.env.REACT_APP_CLAUDE_API_KEY || '',
      perplexity: process.env.REACT_APP_PERPLEXITY_API_KEY || '',
      openRouter: process.env.REACT_APP_OPENROUTER_API_KEY || ''
    },
    notifications: {
      email: true,
      content: true,
      ranking: true
    },
    appearance: {
      darkMode: false,
      compactView: false
    }
  });

  const [showApiKeys, setShowApiKeys] = useState({
    jinaAI: false,
    openAI: false,
    claude: false,
    perplexity: false,
    openRouter: false
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleApiKeyChange = (provider) => (event) => {
    setSettings(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [provider]: event.target.value
      }
    }));
  };

  const toggleApiKeyVisibility = (provider) => {
    setShowApiKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleAppearanceChange = (event) => {
    const { name, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [name]: checked
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Save settings logic here
      // For demo, we'll just show success message
      setSaved(true);
      setError(null);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const apiKeyFields = [
    {
      id: 'jinaAI',
      label: 'Jina AI API Key',
      tooltip: 'Required for content analysis and semantic search features'
    },
    {
      id: 'openAI',
      label: 'OpenAI API Key',
      tooltip: 'Used for advanced content generation and GPT-4 analysis'
    },
    {
      id: 'claude',
      label: 'Claude API Key',
      tooltip: 'Anthropic\'s Claude for in-depth content analysis'
    },
    {
      id: 'perplexity',
      label: 'Perplexity API Key',
      tooltip: 'Real-time content research and fact-checking'
    },
    {
      id: 'openRouter',
      label: 'OpenRouter API Key',
      tooltip: 'Access to multiple AI models through a single API'
    }
  ];

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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            API Configuration
          </Typography>
          <Grid container spacing={3}>
            {apiKeyFields.map(({ id, label, tooltip }) => (
              <Grid item xs={12} key={id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    fullWidth
                    label={label}
                    type={showApiKeys[id] ? 'text' : 'password'}
                    value={settings.apiKeys[id]}
                    onChange={handleApiKeyChange(id)}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => toggleApiKeyVisibility(id)}
                          edge="end"
                        >
                          {showApiKeys[id] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      )
                    }}
                  />
                  <Tooltip title={tooltip}>
                    <IconButton size="small">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.email}
                    onChange={handleNotificationChange}
                    name="email"
                  />
                }
                label="Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.content}
                    onChange={handleNotificationChange}
                    name="content"
                  />
                }
                label="Content Update Alerts"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.ranking}
                    onChange={handleNotificationChange}
                    name="ranking"
                  />
                }
                label="Ranking Change Alerts"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.appearance.darkMode}
                    onChange={handleAppearanceChange}
                    name="darkMode"
                  />
                }
                label="Dark Mode"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.appearance.compactView}
                    onChange={handleAppearanceChange}
                    name="compactView"
                  />
                }
                label="Compact View"
              />
            </Grid>
          </Grid>
        </Paper>

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
    </Container>
  );
};

export default Settings;
