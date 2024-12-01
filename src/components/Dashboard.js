import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  Description as DocumentIcon,
  Search as SearchIcon,
  Assignment as BriefIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { ResponsiveLine } from '@nivo/line';

const mockData = [
  {
    id: "website traffic",
    data: [
      { x: "Jan", y: 147 },
      { x: "Feb", y: 198 },
      { x: "Mar", y: 219 },
      { x: "Apr", y: 252 },
      { x: "May", y: 305 },
      { x: "Jun", y: 356 }
    ]
  }
];

const contentProjects = [
  {
    title: "SEO Strategy Guide 2024",
    type: "Long Form",
    priority: "High",
    keywords: ["seo strategy", "seo guide"],
    team: 3,
    status: "In Writing",
    progress: 75
  },
  {
    title: "Technical SEO Checklist",
    type: "Checklist",
    priority: "Medium",
    keywords: ["technical seo", "seo checklist"],
    team: 2,
    status: "Research",
    progress: 45
  },
  {
    title: "Link Building Guide",
    type: "Guide",
    priority: "High",
    keywords: ["link building", "backlinks"],
    team: 4,
    status: "Brief",
    progress: 15
  },
  {
    title: "Local SEO Best Practices",
    type: "Tutorial",
    priority: "Medium",
    keywords: ["local seo", "google business"],
    team: 3,
    status: "Editing",
    progress: 90
  }
];

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          SEO Content Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DocumentIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="subtitle2" color="textSecondary">
                    Active Content
                  </Typography>
                </Box>
                <Typography variant="h4">18</Typography>
                <Typography variant="body2" color="textSecondary">
                  2 Published
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SearchIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="subtitle2" color="textSecondary">
                    Keywords
                  </Typography>
                </Box>
                <Typography variant="h4">132</Typography>
                <Typography variant="body2" color="textSecondary">
                  28 Ranking
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BriefIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="subtitle2" color="textSecondary">
                    Content Briefs
                  </Typography>
                </Box>
                <Typography variant="h4">12</Typography>
                <Typography variant="body2" color="textSecondary">
                  4 In Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="subtitle2" color="textSecondary">
                    Avg. Position
                  </Typography>
                </Box>
                <Typography variant="h4">14.2</Typography>
                <Typography variant="body2" color="success.main">
                  +2.5 This Month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Traffic Chart */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Website Traffic
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveLine
                  data={mockData}
                  margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                  curve="cardinal"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Time',
                    legendOffset: 36,
                    legendPosition: 'middle'
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Visitors',
                    legendOffset: -40,
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

          {/* Content Projects */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Content Projects</Typography>
              <Button color="primary" href="#/content">View All Content</Button>
            </Box>
            <Paper>
              <Box sx={{ width: '100%', overflow: 'auto' }}>
                <Box sx={{ minWidth: 800 }}>
                  {/* Table Header */}
                  <Grid container sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2">Content Title</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2">Type</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2">Priority</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle2">Target Keywords</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle2">Team</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2">Status</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle2">Progress</Typography>
                    </Grid>
                  </Grid>

                  {/* Table Content */}
                  {contentProjects.map((project, index) => (
                    <Grid container key={index} sx={{ p: 2, '&:hover': { bgcolor: 'action.hover' } }} alignItems="center">
                      <Grid item xs={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DocumentIcon sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography>{project.title}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography>{project.type}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography color={project.priority === 'High' ? 'error.main' : 'warning.main'}>
                          {project.priority}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          {project.keywords.map((keyword, idx) => (
                            <Typography key={idx} variant="body2" color="textSecondary">
                              {keyword}
                            </Typography>
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <Box sx={{ display: 'flex' }}>
                          {[...Array(project.team)].map((_, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: 'grey.300',
                                borderRadius: '50%',
                                ml: idx > 0 ? -0.5 : 0
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography
                          color={
                            project.status === 'Editing' ? 'success.main' :
                            project.status === 'In Writing' ? 'warning.main' :
                            'info.main'
                          }
                        >
                          {project.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={project.progress}
                            sx={{ flexGrow: 1 }}
                          />
                          <Typography variant="body2">{project.progress}%</Typography>
                          <IconButton size="small">
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
