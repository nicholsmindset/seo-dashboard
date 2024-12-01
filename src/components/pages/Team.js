import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  AvatarGroup,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Mail as MailIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const Team = () => {
  const [openAddMember, setOpenAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Content Strategist',
      email: 'sarah.j@company.com',
      avatar: '/avatars/sarah.jpg',
      activeProjects: 5,
      completedProjects: 28,
      performance: {
        onTime: 95,
        quality: 4.8,
      },
      recentActivity: [
        { type: 'content', title: 'Technical SEO Guide', date: '2024-01-15' },
        { type: 'brief', title: 'E-commerce SEO Strategy', date: '2024-01-14' },
      ],
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'SEO Specialist',
      email: 'mike.c@company.com',
      avatar: '/avatars/mike.jpg',
      activeProjects: 3,
      completedProjects: 42,
      performance: {
        onTime: 92,
        quality: 4.6,
      },
      recentActivity: [
        { type: 'keyword', title: 'Keyword Research - Q1', date: '2024-01-15' },
        { type: 'content', title: 'Link Building Guide', date: '2024-01-13' },
      ],
    },
  ];

  // Mock data for team performance
  const teamPerformance = {
    activeProjects: 12,
    completedThisMonth: 8,
    averageQuality: 4.7,
    onTimeDelivery: 94,
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setOpenAddMember(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Team Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddMember(true)}
          >
            Add Team Member
          </Button>
        </Box>

        {/* Team Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Projects
                </Typography>
                <Typography variant="h4">
                  {teamPerformance.activeProjects}
                </Typography>
                <AvatarGroup max={4} sx={{ mt: 2 }}>
                  {teamMembers.map((member) => (
                    <Avatar key={member.id} alt={member.name} src={member.avatar} />
                  ))}
                </AvatarGroup>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completed This Month
                </Typography>
                <Typography variant="h4">
                  {teamPerformance.completedThisMonth}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="success.main">
                    On track
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Average Quality Score
                </Typography>
                <Typography variant="h4">
                  {teamPerformance.averageQuality}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TimelineIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="primary">
                    Above target
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  On-Time Delivery
                </Typography>
                <Typography variant="h4">
                  {teamPerformance.onTimeDelivery}%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <ScheduleIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="success.main">
                    Excellent
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Team Members Grid */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab label="All Members" />
            <Tab label="Active" />
            <Tab label="Projects" />
            <Tab label="Performance" />
          </Tabs>

          <Grid container spacing={3}>
            {teamMembers.map((member) => (
              <Grid item xs={12} md={6} lg={4} key={member.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={member.avatar}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">
                          {member.name}
                        </Typography>
                        <Typography color="textSecondary">
                          {member.role}
                        </Typography>
                      </Box>
                    </Box>

                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <AssignmentIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Active Projects"
                          secondary={`${member.activeProjects} active, ${member.completedProjects} completed`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'success.main' }}>
                            <CheckCircleIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Performance"
                          secondary={`${member.performance.onTime}% on-time, ${member.performance.quality} quality score`}
                        />
                      </ListItem>
                    </List>

                    <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                      Recent Activity
                    </Typography>
                    <List dense>
                      {member.recentActivity.map((activity, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={activity.title}
                            secondary={activity.date}
                          />
                          <Chip
                            label={activity.type}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleMemberClick(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<MailIcon />}
                      href={`mailto:${member.email}`}
                    >
                      Contact
                    </Button>
                    <Button
                      size="small"
                      startIcon={<ScheduleIcon />}
                    >
                      Analytics
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Add/Edit Member Dialog */}
        <Dialog
          open={openAddMember}
          onClose={() => {
            setOpenAddMember(false);
            setSelectedMember(null);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedMember ? 'Edit Team Member' : 'Add New Team Member'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    defaultValue={selectedMember?.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Role"
                    defaultValue={selectedMember?.role}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    defaultValue={selectedMember?.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Access Permissions
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label="Content Management" onDelete={() => {}} />
                    <Chip label="Analytics" onDelete={() => {}} />
                    <Chip label="Team Management" onDelete={() => {}} />
                    <Chip label="Settings" onDelete={() => {}} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpenAddMember(false);
              setSelectedMember(null);
            }}>
              Cancel
            </Button>
            <Button variant="contained">
              {selectedMember ? 'Save Changes' : 'Add Member'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Team;
