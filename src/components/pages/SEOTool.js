import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const SEOTool = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>
        SEO Analysis Tool
      </Typography>

      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Content Analysis
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Enter your content"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Target Keywords"
              variant="outlined"
              margin="normal"
              helperText="Separate keywords with commas"
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
              fullWidth
            >
              Analyze Content
            </Button>
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                SEO Analysis Results
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Keyword Density"
                    secondary="Analysis will appear here"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Content Length"
                    secondary="Analysis will appear here"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Readability Score"
                    secondary="Analysis will appear here"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Meta Description"
                    secondary="Analysis will appear here"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              SEO Recommendations
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Recommendations will appear here after analysis
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SEOTool;
