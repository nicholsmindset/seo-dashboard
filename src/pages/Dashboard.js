import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { ResponsiveLine } from '@nivo/line';

const mockData = [
  {
    id: 'page views',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 120 },
      { x: 'Mar', y: 140 },
      { x: 'Apr', y: 160 },
      { x: 'May', y: 180 },
      { x: 'Jun', y: 200 },
    ],
  },
];

const recentContent = [
  {
    title: 'SEO Best Practices 2024',
    views: 1200,
    trend: '+15%',
    status: 'Published',
  },
  {
    title: 'Content Marketing Guide',
    views: 800,
    trend: '+10%',
    status: 'Draft',
  },
  {
    title: 'Social Media Strategy',
    views: 950,
    trend: '+12%',
    status: 'Review',
  },
];

const DashboardHome = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Analytics Cards */}
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Views
              </Typography>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                45.2K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                15% increase
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Avg. Time on Page
              </Typography>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                2:30
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5% increase
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Content Pieces
              </Typography>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                128
              </Typography>
              <Typography variant="body2" color="text.secondary">
                12 this month
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Typography variant="h6" gutterBottom>
                SEO Score
              </Typography>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                92
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +2 points
              </Typography>
            </Paper>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Page Views Over Time
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveLine
                  data={mockData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      symbolSize: 12,
                      symbolShape: 'circle',
                    },
                  ]}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Recent Content */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Recent Content
              </Typography>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {recentContent.map((content, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="more">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={content.title}
                      secondary={`${content.views} views • ${content.trend}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      New Content
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create a new content piece
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Create</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Analytics
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View detailed analytics
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      SEO Check
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Run SEO analysis
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Analyze</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Schedule
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      View content calendar
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardHome;
