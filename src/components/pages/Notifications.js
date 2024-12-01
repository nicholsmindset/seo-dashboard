import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Warning as WarningIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
} from '@mui/icons-material';

const notificationData = [
  {
    id: 1,
    type: 'alert',
    message: 'Keyword ranking dropped for "digital marketing"',
    timestamp: '30 minutes ago',
    priority: 'high',
    read: false,
  },
  {
    id: 2,
    type: 'task',
    message: 'New content brief ready for review',
    timestamp: '2 hours ago',
    priority: 'medium',
    read: false,
  },
  {
    id: 3,
    type: 'update',
    message: 'Monthly SEO report generated',
    timestamp: '1 day ago',
    priority: 'low',
    read: true,
  },
];

const getIcon = (type, priority) => {
  switch (type) {
    case 'alert':
      return <WarningIcon color={priority === 'high' ? 'error' : 'warning'} />;
    case 'task':
      return <AssignmentIcon color="primary" />;
    case 'update':
      return <TrendingUpIcon color="success" />;
    default:
      return <NotificationsIcon />;
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const Notifications = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          Notifications
        </Typography>
        <Button
          variant="outlined"
          startIcon={<DoneIcon />}
        >
          Mark All as Read
        </Button>
      </Box>

      <Paper>
        <List>
          {notificationData.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                }}
              >
                <ListItemIcon>
                  {getIcon(notification.type, notification.priority)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  secondary={
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                      <Typography variant="body2" component="span">
                        {notification.timestamp}
                      </Typography>
                      <Chip
                        label={notification.priority}
                        size="small"
                        color={getPriorityColor(notification.priority)}
                      />
                    </Box>
                  }
                />
                <Box>
                  {!notification.read && (
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <DoneIcon />
                    </IconButton>
                  )}
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
              {index < notificationData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Notifications;
