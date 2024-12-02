import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tab,
  Tabs,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as TestIcon
} from '@mui/icons-material';
import { useWebhooks } from '../../contexts/WebhookContext';
import { useUser } from '../../contexts/UserContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useAPIKey } from '../../contexts/APIKeyContext';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [webhookDialog, setWebhookDialog] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const { webhooks, addWebhook, updateWebhook, deleteWebhook, testWebhook } = useWebhooks();
  const { preferences, updatePreferences } = useUser();
  const { accessibilitySettings, toggleHighContrast, toggleLargeText, toggleScreenReaderOptimized } = useAccessibility();
  const { apiKeys, setAPIKey, removeAPIKey } = useAPIKey();

  const [webhookForm, setWebhookForm] = useState({
    name: '',
    url: '',
    method: 'POST',
    headers: '{}',
    body: '{}'
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleWebhookSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingWebhook) {
        await updateWebhook(editingWebhook.id, webhookForm);
      } else {
        await addWebhook(webhookForm);
      }
      setSnackbar({
        open: true,
        message: `Webhook ${editingWebhook ? 'updated' : 'added'} successfully`,
        severity: 'success'
      });
      setWebhookDialog(false);
      setEditingWebhook(null);
      resetWebhookForm();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  const handleWebhookTest = async (webhookId) => {
    const result = await testWebhook(webhookId);
    setSnackbar({
      open: true,
      message: result.success ? 'Webhook tested successfully' : `Test failed: ${result.error}`,
      severity: result.success ? 'success' : 'error'
    });
  };

  const handleWebhookDelete = async (webhookId) => {
    if (window.confirm('Are you sure you want to delete this webhook?')) {
      await deleteWebhook(webhookId);
      setSnackbar({
        open: true,
        message: 'Webhook deleted successfully',
        severity: 'success'
      });
    }
  };

  const resetWebhookForm = () => {
    setWebhookForm({
      name: '',
      url: '',
      method: 'POST',
      headers: '{}',
      body: '{}'
    });
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="settings tabs">
          <Tab label="General" />
          <Tab label="Webhooks" />
          <Tab label="API Keys" />
          <Tab label="Accessibility" />
        </Tabs>
      </Paper>

      <TabPanel value={activeTab} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>General Settings</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={preferences.language}
                onChange={(e) => updatePreferences({ language: e.target.value })}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Date Format</InputLabel>
              <Select
                value={preferences.dateFormat}
                onChange={(e) => updatePreferences({ dateFormat: e.target.value })}
              >
                <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Webhooks</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setEditingWebhook(null);
                  resetWebhookForm();
                  setWebhookDialog(true);
                }}
              >
                Add Webhook
              </Button>
            </Box>

            <List>
              {webhooks.map((webhook) => (
                <ListItem key={webhook.id}>
                  <ListItemText
                    primary={webhook.name}
                    secondary={`${webhook.method} ${webhook.url}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="test"
                      onClick={() => handleWebhookTest(webhook.id)}
                      sx={{ mr: 1 }}
                    >
                      <TestIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        setEditingWebhook(webhook);
                        setWebhookForm(webhook);
                        setWebhookDialog(true);
                      }}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleWebhookDelete(webhook.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>API Keys</Typography>
            {/* Existing API Keys section */}
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Accessibility Settings</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={toggleHighContrast}
              >
                {accessibilitySettings.highContrast ? 'Disable' : 'Enable'} High Contrast
              </Button>
              <Button
                variant="outlined"
                onClick={toggleLargeText}
              >
                {accessibilitySettings.largeText ? 'Disable' : 'Enable'} Large Text
              </Button>
              <Button
                variant="outlined"
                onClick={toggleScreenReaderOptimized}
              >
                {accessibilitySettings.screenReaderOptimized ? 'Disable' : 'Enable'} Screen Reader Optimization
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Webhook Dialog */}
      <Dialog open={webhookDialog} onClose={() => setWebhookDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingWebhook ? 'Edit Webhook' : 'Add Webhook'}</DialogTitle>
        <form onSubmit={handleWebhookSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={webhookForm.name}
              onChange={(e) => setWebhookForm({ ...webhookForm, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="URL"
              value={webhookForm.url}
              onChange={(e) => setWebhookForm({ ...webhookForm, url: e.target.value })}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Method</InputLabel>
              <Select
                value={webhookForm.method}
                onChange={(e) => setWebhookForm({ ...webhookForm, method: e.target.value })}
              >
                <MenuItem value="GET">GET</MenuItem>
                <MenuItem value="POST">POST</MenuItem>
                <MenuItem value="PUT">PUT</MenuItem>
                <MenuItem value="DELETE">DELETE</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Headers (JSON)"
              value={webhookForm.headers}
              onChange={(e) => setWebhookForm({ ...webhookForm, headers: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Body (JSON)"
              value={webhookForm.body}
              onChange={(e) => setWebhookForm({ ...webhookForm, body: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setWebhookDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingWebhook ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
