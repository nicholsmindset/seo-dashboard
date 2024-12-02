import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const MetricCard = ({ title, value, change, icon }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h6" sx={{ ml: 1 }}>
        {title}
      </Typography>
    </Box>
    <Typography variant="h4" gutterBottom>
      {value}
    </Typography>
    <Typography
      variant="body2"
      color={change >= 0 ? 'success.main' : 'error.main'}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <TrendingUpIcon sx={{ mr: 0.5 }} />
      {change >= 0 ? '+' : ''}{change}% from last month
    </Typography>
  </Paper>
);

const DemoMetrics = () => {
  const metrics = [
    {
      title: 'Content Score',
      value: '82/100',
      change: 8.5,
      icon: <ArticleIcon color="primary" />
    },
    {
      title: 'SEO Performance',
      value: '78%',
      change: 12.3,
      icon: <SearchIcon color="primary" />
    },
    {
      title: 'Keywords Ranked',
      value: '156',
      change: 15.7,
      icon: <TrendingUpIcon color="primary" />
    },
    {
      title: 'Monthly Traffic',
      value: '24.5K',
      change: 23.1,
      icon: <AnalyticsIcon color="primary" />
    }
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DemoMetrics;
