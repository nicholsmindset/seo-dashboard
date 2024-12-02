import React, { useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PreviewChart from '../components/PreviewChart';
import DemoMetrics from '../components/DemoMetrics';

const Preview = () => {
  const { enablePreviewMode, isPreviewMode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPreviewMode) {
      enablePreviewMode();
    }
  }, [enablePreviewMode, isPreviewMode]);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          SEO Content Management Dashboard
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="textSecondary">
          Preview Mode - Experience the Power of AI-Driven SEO
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {/* Demo Metrics */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sample Performance Metrics
              </Typography>
              <DemoMetrics />
            </Paper>
          </Grid>

          {/* Sample Chart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Content Performance Overview
              </Typography>
              <PreviewChart />
            </Paper>
          </Grid>

          {/* Features */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Content Analysis
              </Typography>
              <Typography>
                Leverage multiple AI providers including OpenAI, Claude, and Perplexity for in-depth content analysis and optimization recommendations.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                SEO Optimization
              </Typography>
              <Typography>
                Get real-time SEO suggestions, keyword analysis, and content structure recommendations powered by advanced AI models.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Performance Tracking
              </Typography>
              <Typography>
                Monitor your content performance, track rankings, and receive AI-powered insights for continuous improvement.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetStarted}
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            href="https://github.com/nicholsmindset/seo-dashboard"
            target="_blank"
          >
            View on GitHub
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Preview;
