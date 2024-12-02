import React from 'react';
import { Box, Button, Container, Grid, Typography, Card, CardContent, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Speed as SpeedIcon,
  Analytics as AnalyticsIcon,
  Webhook as WebhookIcon,
  Security as SecurityIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

const features = [
  {
    icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
    title: 'Advanced SEO Analytics',
    description: 'Real-time SEO metrics and performance tracking with detailed insights and recommendations.'
  },
  {
    icon: <WebhookIcon sx={{ fontSize: 40 }} />,
    title: 'Webhook Integration',
    description: 'Seamless integration with popular SEO tools, content platforms, and social media channels.'
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 40 }} />,
    title: 'Content Performance',
    description: 'Track and optimize your content performance with AI-powered recommendations.'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Enterprise Security',
    description: 'Bank-level security with encrypted data storage and advanced access controls.'
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: 'Real-time Monitoring',
    description: 'Monitor your SEO performance in real-time with instant alerts and notifications.'
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
    title: 'Custom Reports',
    description: 'Generate comprehensive SEO reports with customizable metrics and visualizations.'
  }
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
          color: 'white',
          py: 12
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                SEO Content Management Dashboard
              </Typography>
              <Typography variant="h5" component="h2" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.9)' }}>
                Streamline your SEO workflow with our powerful content management platform
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{ 
                    bgcolor: '#fff',
                    color: '#1a237e',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    color: '#fff',
                    borderColor: '#fff',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.9)',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Features
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 8 }}>
          Everything you need to optimize your SEO content workflow
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2, color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Ready to optimize your SEO workflow?
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of content managers who are already using our platform
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/signup')}
              sx={{ px: 4 }}
            >
              Start Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
