import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from '../config/firebase';
import NotificationService from '../services/notificationService';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const seoTools = [
  'Google Analytics',
  'Google Search Console',
  'SEMrush',
  'Ahrefs',
  'Moz',
  'Screaming Frog',
  'Majestic',
  'Yoast SEO',
  'Clearscope',
  'Surfer SEO'
];

const contentPlatforms = [
  'WordPress',
  'Medium',
  'Ghost',
  'Contentful',
  'Strapi',
  'Webflow',
  'Shopify',
  'Wix',
  'Squarespace',
  'Custom CMS'
];

const teamSizes = [
  '1-5',
  '6-10',
  '11-25',
  '26-50',
  '51-100',
  '100+'
];

const steps = ['Company Profile', 'Tools & Integrations', 'Team Setup', 'Goals & Metrics'];

const Onboarding = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = getAuth();
  const notifications = new NotificationService(auth?.currentUser?.uid);
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Company Profile
    industry: '',
    teamSize: '',
    websiteUrl: '',
    monthlyTraffic: '',
    
    // Tools & Integrations
    currentSeoTools: [],
    contentPlatforms: [],
    
    // Team Setup
    hasContentTeam: false,
    hasSeoSpecialist: false,
    teamMembers: [],
    
    // Goals & Metrics
    trafficGoal: '',
    focusKeywords: '',
    contentFrequency: '',
    primaryMetrics: []
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        // Save onboarding data
        await set(ref(database, `users/${user.uid}/onboarding`), {
          ...formData,
          completedAt: new Date().toISOString(),
          status: 'completed'
        });

        // Update user preferences based on onboarding
        await set(ref(database, `users/${user.uid}/preferences`), {
          emailNotifications: true,
          webhookAlerts: true,
          contentUpdates: true,
          seoAlerts: true,
          dailyReports: true,
          toolIntegrations: formData.currentSeoTools,
          contentPlatforms: formData.contentPlatforms
        });

        await notifications.notifySystemEvent(
          'Onboarding Complete',
          'Welcome to the SEO Content Management Dashboard!'
        );

        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Team Size</InputLabel>
                <Select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  label="Team Size"
                >
                  {teamSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Website URL"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Monthly Traffic"
                value={formData.monthlyTraffic}
                onChange={(e) => setFormData({ ...formData, monthlyTraffic: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Current SEO Tools</InputLabel>
                <Select
                  multiple
                  value={formData.currentSeoTools}
                  onChange={(e) => setFormData({ ...formData, currentSeoTools: e.target.value })}
                  input={<OutlinedInput label="Current SEO Tools" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {seoTools.map((tool) => (
                    <MenuItem key={tool} value={tool}>
                      <Checkbox checked={formData.currentSeoTools.indexOf(tool) > -1} />
                      {tool}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Content Platforms</InputLabel>
                <Select
                  multiple
                  value={formData.contentPlatforms}
                  onChange={(e) => setFormData({ ...formData, contentPlatforms: e.target.value })}
                  input={<OutlinedInput label="Content Platforms" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {contentPlatforms.map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      <Checkbox checked={formData.contentPlatforms.indexOf(platform) > -1} />
                      {platform}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.hasContentTeam}
                    onChange={(e) => setFormData({ ...formData, hasContentTeam: e.target.checked })}
                  />
                }
                label="Do you have a dedicated content team?"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.hasSeoSpecialist}
                    onChange={(e) => setFormData({ ...formData, hasSeoSpecialist: e.target.checked })}
                  />
                }
                label="Do you have an SEO specialist?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Team Members (comma-separated emails)"
                value={formData.teamMembers.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  teamMembers: e.target.value.split(',').map(email => email.trim()) 
                })}
                helperText="Enter email addresses of team members you'd like to invite"
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Monthly Traffic Goal"
                value={formData.trafficGoal}
                onChange={(e) => setFormData({ ...formData, trafficGoal: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Focus Keywords"
                multiline
                rows={3}
                value={formData.focusKeywords}
                onChange={(e) => setFormData({ ...formData, focusKeywords: e.target.value })}
                helperText="Enter your target keywords (one per line)"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Content Frequency</InputLabel>
                <Select
                  value={formData.contentFrequency}
                  onChange={(e) => setFormData({ ...formData, contentFrequency: e.target.value })}
                  label="Content Frequency"
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="biweekly">Bi-weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Welcome to Your SEO Dashboard
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Let's set up your dashboard to match your needs
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4, mb: 4 }}>
            {getStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleComplete}
                disabled={loading}
              >
                {loading ? 'Completing Setup...' : 'Complete Setup'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Onboarding;
