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
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Article as ArticleIcon,
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  Restore as RestoreIcon,
} from '@mui/icons-material';

const historyData = [
  {
    id: 1,
    action: 'Content Updated',
    item: 'How to Optimize Your Website for SEO',
    timestamp: '2 hours ago',
    user: 'John Doe',
    type: 'content',
  },
  {
    id: 2,
    action: 'Keyword Added',
    item: 'digital marketing strategies',
    timestamp: '4 hours ago',
    user: 'Jane Smith',
    type: 'keyword',
  },
  {
    id: 3,
    action: 'Brief Created',
    item: 'Content Strategy for Q1 2024',
    timestamp: '1 day ago',
    user: 'Mike Johnson',
    type: 'brief',
  },
];

const getIcon = (type) => {
  switch (type) {
    case 'content':
      return <ArticleIcon />;
    case 'keyword':
      return <SearchIcon />;
    case 'brief':
      return <AssignmentIcon />;
    default:
      return <ArticleIcon />;
  }
};

const History = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>
        Activity History
      </Typography>

      <Paper>
        <List>
          {historyData.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemIcon>
                  {getIcon(item.type)}
                </ListItemIcon>
                <ListItemText
                  primary={item.item}
                  secondary={
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant="body2" component="span">
                        {item.action} by {item.user}
                      </Typography>
                      <Chip
                        label={item.timestamp}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <RestoreIcon sx={{ mr: 1 }} />
                  <DeleteIcon />
                </ListItemSecondaryAction>
              </ListItem>
              {index < historyData.length - 1 && <></>}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default History;
