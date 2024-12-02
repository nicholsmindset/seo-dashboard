import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';

const SEOTool = () => {
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!url) {
      setError('Please enter a URL to analyze');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // SEO analysis logic would go here
      const mockResults = {
        score: 85,
        title: { score: 90, suggestions: ['Good length', 'Contains primary keyword'] },
        meta: { score: 85, suggestions: ['Add more relevant keywords'] },
        headings: { score: 80, suggestions: ['Use more H2 and H3 tags'] },
        content: { score: 85, suggestions: ['Increase word count', 'Add more internal links'] }
      };
      
      setResults(mockResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        SEO Analysis Tool
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Analyze URL
            </Typography>
            <TextField
              fullWidth
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Target Keywords (comma separated)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={!url || loading}
            >
              Analyze
            </Button>
          </Paper>
        </Grid>

        {results && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }} elevation={3}>
              <Typography variant="h6" gutterBottom>
                SEO Score: {results.score}/100
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Title Analysis
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={`Score: ${results.title.score}/100`}
                    color={results.title.score >= 80 ? 'success' : 'warning'}
                    sx={{ mr: 1 }}
                  />
                </Box>
                <List dense>
                  {results.title.suggestions.map((suggestion, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={suggestion} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Meta Description Analysis
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={`Score: ${results.meta.score}/100`}
                    color={results.meta.score >= 80 ? 'success' : 'warning'}
                    sx={{ mr: 1 }}
                  />
                </Box>
                <List dense>
                  {results.meta.suggestions.map((suggestion, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={suggestion} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Headings Analysis
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={`Score: ${results.headings.score}/100`}
                    color={results.headings.score >= 80 ? 'success' : 'warning'}
                    sx={{ mr: 1 }}
                  />
                </Box>
                <List dense>
                  {results.headings.suggestions.map((suggestion, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={suggestion} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Content Analysis
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={`Score: ${results.content.score}/100`}
                    color={results.content.score >= 80 ? 'success' : 'warning'}
                    sx={{ mr: 1 }}
                  />
                </Box>
                <List dense>
                  {results.content.suggestions.map((suggestion, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={suggestion} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SEOTool;
