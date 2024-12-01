import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Box,
  LinearProgress,
} from '@mui/material';

const ContentAnalytics = () => {
  // Sample data - in a real app, this would come from your backend
  const analyticsData = {
    pageViews: 15234,
    averageTimeOnPage: '2:45',
    bounceRate: '35%',
    topKeywords: [
      { keyword: 'SEO optimization', score: 85 },
      { keyword: 'content strategy', score: 75 },
      { keyword: 'digital marketing', score: 70 },
      { keyword: 'keyword research', score: 65 },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Content Analytics
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Page Views
              </Typography>
              <Typography variant="h5">
                {analyticsData.pageViews.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Time on Page
              </Typography>
              <Typography variant="h5">
                {analyticsData.averageTimeOnPage}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Bounce Rate
              </Typography>
              <Typography variant="h5">
                {analyticsData.bounceRate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Performing Keywords */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Top Performing Keywords
        </Typography>
        <Grid container spacing={2}>
          {analyticsData.topKeywords.map((keyword, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{keyword.keyword}</Typography>
                  <Typography variant="body2">{keyword.score}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={keyword.score}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Placeholder for future charts */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Performance Trends
        </Typography>
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="textSecondary">
            Charts and graphs will be displayed here
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContentAnalytics;
