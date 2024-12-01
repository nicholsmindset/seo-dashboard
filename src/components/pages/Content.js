import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  IconButton,
  TextField,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const mockContent = [
  {
    id: 1,
    title: "10 SEO Tips for 2024",
    status: "Published",
    author: "John Doe",
    date: "2024-01-15",
    views: 1250,
  },
  {
    id: 2,
    title: "Content Marketing Strategy Guide",
    status: "Draft",
    author: "Jane Smith",
    date: "2024-01-20",
    views: 0,
  },
];

const Content = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          Content Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
        >
          New Content
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search content..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {mockContent.map((content) => (
          <Grid item xs={12} md={6} key={content.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {content.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={content.status}
                    color={content.status === "Published" ? "success" : "default"}
                    size="small"
                  />
                  <Chip
                    label={`${content.views} views`}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Typography color="textSecondary" variant="body2">
                  By {content.author} • {content.date}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton size="small" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Content;
