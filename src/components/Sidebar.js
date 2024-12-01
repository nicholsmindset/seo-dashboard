import React, { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Box, 
  Tooltip 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Article as ContentIcon,
  Analytics as AnalyticsIcon,
  Search as KeywordIcon,
  Group as TeamIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const sidebarWidth = open ? 240 : 73;

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/' 
    },
    { 
      text: 'Content Briefs', 
      icon: <ContentIcon />, 
      path: '/briefs' 
    },
    { 
      text: 'Keywords', 
      icon: <KeywordIcon />, 
      path: '/keywords' 
    },
    { 
      text: 'Analytics', 
      icon: <AnalyticsIcon />, 
      path: '/analytics' 
    },
    { 
      text: 'Team', 
      icon: <TeamIcon />, 
      path: '/team' 
    },
    { 
      text: 'History', 
      icon: <HistoryIcon />, 
      path: '/history' 
    },
    { 
      text: 'Notifications', 
      icon: <NotificationsIcon />, 
      path: '/notifications' 
    },
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/settings' 
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden'
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          p: 1 
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item) => (
          <Tooltip 
            key={item.text} 
            title={!open ? item.text : ''} 
            placement="right"
          >
            <ListItem
              component={Link}
              to={item.path}
              sx={{
                justifyContent: 'center',
                px: open ? 2 : 0,
                backgroundColor: location.pathname === item.path 
                  ? 'rgba(0, 0, 0, 0.04)' 
                  : 'transparent'
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 'auto', 
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
