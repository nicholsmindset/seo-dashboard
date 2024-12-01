import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Article as ContentIcon,
  Assignment as BriefIcon,
  Search as KeywordsIcon,
  BarChart as AnalyticsIcon,
  People as TeamIcon,
  Description as TemplatesIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Content', icon: <ContentIcon />, path: '/content' },
  { text: 'Content Briefs', icon: <BriefIcon />, path: '/briefs' },
  { text: 'Keywords', icon: <KeywordsIcon />, path: '/keywords' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Team', icon: <TeamIcon />, path: '/team' },
  { text: 'Templates', icon: <TemplatesIcon />, path: '/templates' },
  { text: 'History', icon: <HistoryIcon />, path: '/history' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#1E2029',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" sx={{ color: '#fff' }}>
          SEO Dashboard
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
              '&.Mui-selected': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
