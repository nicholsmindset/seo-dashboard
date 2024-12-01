import React, { useState, useCallback } from 'react';
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
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccessibilityNew as AccessibilityIcon,
  FontDownload as FontSizeIcon,
  ContrastOutlined as ContrastIcon,
  RecordVoiceOver as ScreenReaderIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  ColorLens as ThemeIcon,
  DataUsage as DataIcon,
} from '@mui/icons-material';

// Import validation utilities
import { APIKeyValidators, APIKeyManager, APIKeyError } from '../../utils/apiKeyValidation';
import { useAppTheme } from '../../contexts/ThemeContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';

const Settings = () => {
  const { mode, toggleThemeMode } = useAppTheme();
  const { 
    fontSize, 
    highContrast, 
    screenReaderMode, 
    updateAccessibility 
  } = useAccessibility();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: mode === 'dark',
    autoSave: true,
    dataSharing: false,
    language: 'English',
  });

  const [apiKeys, setApiKeys] = useState({
    openai: APIKeyManager.getAPIKey('openai'),
    perplexity: APIKeyManager.getAPIKey('perplexity'),
    claude: APIKeyManager.getAPIKey('claude'),
    jinaai: APIKeyManager.getAPIKey('jinaai'),
  });

  const [showKeys, setShowKeys] = useState({
    openai: false,
    perplexity: false,
    claude: false,
    jinaai: false,
  });

  const [keyValidation, setKeyValidation] = useState({
    openai: null,
    perplexity: null,
    claude: null,
    jinaai: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleToggle = (setting) => {
    if (setting === 'darkMode') {
      // Toggle theme mode
      toggleThemeMode();
    }

    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const toggleKeyVisibility = (provider) => {
    setShowKeys((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
  };

  const handleApiKeyChange = (provider, value) => {
    setApiKeys((prev) => ({
      ...prev,
      [provider]: value,
    }));
  };

  const validateAndSaveApiKey = useCallback(async (provider) => {
    const key = apiKeys[provider];

    try {
      // Validate key format
      if (!APIKeyValidators.validateKey(provider, key)) {
        throw new APIKeyError(provider, 'Invalid API key format');
      }

      // Test API key connectivity
      const isValid = await APIKeyManager.testAPIKey(provider, key);
      
      if (isValid) {
        // Save key
        APIKeyManager.storeAPIKey(provider, key);
        
        // Update validation state
        setKeyValidation((prev) => ({
          ...prev,
          [provider]: true,
        }));

        // Show success snackbar
        setSnackbar({
          open: true,
          message: `${provider.toUpperCase()} API key validated successfully!`,
          severity: 'success',
        });
      } else {
        throw new APIKeyError(provider, 'API key connectivity test failed');
      }
    } catch (error) {
      // Handle validation errors
      setKeyValidation((prev) => ({
        ...prev,
        [provider]: false,
      }));

      // Show error snackbar
      setSnackbar({
        open: true,
        message: error.message || `Failed to validate ${provider.toUpperCase()} API key`,
        severity: 'error',
      });
    }
  }, [apiKeys]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Settings
      </Typography>
      
      {/* General Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>General Settings</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Email Notifications" />
            <Switch
              edge="end"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            </ListItemIcon>
            <ListItemText 
              primary="Dark Mode" 
              secondary={`Currently in ${mode} mode`} 
            />
            <Switch
              edge="end"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
          </ListItem>
        </List>
      </Paper>

      {/* Accessibility Settings */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          <AccessibilityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Accessibility
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <FontSizeIcon />
            </ListItemIcon>
            <ListItemText primary="Font Size" />
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Size</InputLabel>
              <Select
                value={fontSize}
                label="Size"
                onChange={(e) => updateAccessibility({ fontSize: e.target.value })}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
                <MenuItem value="xlarge">Extra Large</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <ContrastIcon />
            </ListItemIcon>
            <ListItemText 
              primary="High Contrast Mode" 
              secondary="Improve readability for visually impaired users" 
            />
            <Switch
              edge="end"
              checked={highContrast}
              onChange={() => updateAccessibility({ highContrast: !highContrast })}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <ScreenReaderIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Screen Reader Mode" 
              secondary="Optimize interface for screen readers" 
            />
            <Switch
              edge="end"
              checked={screenReaderMode}
              onChange={() => updateAccessibility({ screenReaderMode: !screenReaderMode })}
            />
          </ListItem>
        </List>
      </Paper>

      {/* API Configuration */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>AI API Configuration</Typography>
        <Grid container spacing={3}>
          {[
            { 
              provider: 'openai', 
              name: 'OpenAI', 
              description: 'Configure your OpenAI API key for advanced AI capabilities' 
            },
            { 
              provider: 'perplexity', 
              name: 'Perplexity', 
              description: 'Set up Perplexity AI API for intelligent search and insights' 
            },
            { 
              provider: 'claude', 
              name: 'Claude', 
              description: 'Integrate Anthropic\'s Claude AI API' 
            },
            { 
              provider: 'jinaai', 
              name: 'Jina.ai', 
              description: 'Configure Jina.ai API for multimodal AI capabilities' 
            }
          ].map(({ provider, name, description }) => (
            <Grid item xs={12} md={6} key={provider}>
              <Card 
                variant="outlined" 
                sx={{ 
                  borderColor: 
                    keyValidation[provider] === true ? 'success.main' : 
                    keyValidation[provider] === false ? 'error.main' : 'default'
                }}
              >
                <CardHeader 
                  title={`${name} API`}
                  subheader={description}
                  action={
                    keyValidation[provider] === true ? (
                      <CheckIcon color="success" />
                    ) : keyValidation[provider] === false ? (
                      <ErrorIcon color="error" />
                    ) : null
                  }
                />
                <CardContent>
                  <TextField
                    fullWidth
                    label={`${name} API Key`}
                    type={showKeys[provider] ? 'text' : 'password'}
                    value={apiKeys[provider]}
                    onChange={(e) => handleApiKeyChange(provider, e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    InputProps={{
                      endAdornment: (
                        <>
                          <Tooltip title={showKeys[provider] ? 'Hide Key' : 'Show Key'}>
                            <IconButton 
                              onClick={() => toggleKeyVisibility(provider)}
                              edge="end"
                            >
                              {showKeys[provider] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Validate API Key">
                            <Button 
                              variant="contained" 
                              color="primary" 
                              size="small"
                              onClick={() => validateAndSaveApiKey(provider)}
                              sx={{ ml: 1 }}
                            >
                              Validate
                            </Button>
                          </Tooltip>
                        </>
                      )
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
