import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  TextField,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const templateData = [
  {
    id: 1,
    title: 'Blog Post Template',
    description: 'Standard blog post structure with SEO optimization sections',
    type: 'Blog',
    lastModified: '2023-11-28',
  },
  {
    id: 2,
    title: 'Product Review',
    description: 'Detailed product review template with pros/cons and rating system',
    type: 'Review',
    lastModified: '2023-11-25',
  },
  {
    id: 3,
    title: 'How-To Guide',
    description: 'Step-by-step tutorial template with image placeholders',
    type: 'Guide',
    lastModified: '2023-11-20',
  },
];

const Templates = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          Content Templates
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
        >
          New Template
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search templates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {templateData.map((template) => (
          <Grid item xs={12} md={4} key={template.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {template.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {template.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={template.type} size="small" />
                  <Chip 
                    label={`Modified: ${template.lastModified}`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton size="small" title="Copy">
                  <CopyIcon />
                </IconButton>
                <IconButton size="small" title="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" title="Delete">
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

export default Templates;
