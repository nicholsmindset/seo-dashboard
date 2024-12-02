import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress
} from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';

const ContentAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  // Mock data for visualization
  const pageViewsData = [
    {
      id: "page views",
      data: [
        { x: "2024-02-01", y: 200 },
        { x: "2024-02-02", y: 300 },
        { x: "2024-02-03", y: 400 },
        { x: "2024-02-04", y: 350 },
        { x: "2024-02-05", y: 500 },
        { x: "2024-02-06", y: 450 },
        { x: "2024-02-07", y: 550 }
      ]
    }
  ];

  const contentTypeData = [
    { id: "blog posts", value: 45 },
    { id: "articles", value: 30 },
    { id: "guides", value: 15 },
    { id: "case studies", value: 10 }
  ];

  const engagementData = [
    { metric: "Avg. Time on Page", value: 245 },
    { metric: "Bounce Rate", value: 65 },
    { metric: "Pages per Session", value: 2.5 },
    { metric: "Return Rate", value: 35 }
  ];

  return (
    <Container>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Content Analytics
        </Typography>
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="7d">Last 7 Days</MenuItem>
            <MenuItem value="30d">Last 30 Days</MenuItem>
            <MenuItem value="90d">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Page Views Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, height: 400 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Page Views Over Time
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveLine
                data={pageViewsData}
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: 'Date',
                  legendOffset: 45,
                  legendPosition: 'middle'
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Page Views',
                  legendOffset: -50,
                  legendPosition: 'middle'
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Content Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Content Type Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsivePie
                data={contentTypeData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Engagement Metrics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Engagement Metrics
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveBar
                data={engagementData}
                keys={['value']}
                indexBy="metric"
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentAnalytics;
