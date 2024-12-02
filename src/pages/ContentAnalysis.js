import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  analyzeCompetitorContent,
  identifyContentGaps,
  analyzeContentFreshness,
  searchContentIdeas
} from '../services/contentAnalysisService';

const ContentAnalysis = () => {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCompetitorAnalysis = async () => {
    if (!url) {
      setError('Please enter a URL to analyze');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await analyzeCompetitorContent(url);
      setResults({ type: 'competitor', data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContentGaps = async () => {
    if (!content) {
      setError('Please enter your content to analyze');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await identifyContentGaps(content, [url]);
      setResults({ type: 'gaps', data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContentFreshness = async () => {
    if (!content) {
      setError('Please enter content to analyze');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await analyzeContentFreshness(content);
      setResults({ type: 'freshness', data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContentIdeas = async () => {
    if (!topic) {
      setError('Please enter a topic to search for');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchContentIdeas(topic);
      setResults({ type: 'ideas', data });
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
        Content Analysis
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Competitor Analysis
            </Typography>
            <TextField
              fullWidth
              label="Competitor URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleCompetitorAnalysis}
              disabled={!url || loading}
            >
              Analyze Competitor
            </Button>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Content Gaps
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleContentGaps}
              disabled={!content || loading}
            >
              Find Content Gaps
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Content Freshness
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content to Analyze"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleContentFreshness}
              disabled={!content || loading}
            >
              Check Freshness
            </Button>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Content Ideas
            </Typography>
            <TextField
              fullWidth
              label="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleContentIdeas}
              disabled={!topic || loading}
            >
              Get Ideas
            </Button>
          </Paper>
        </Grid>

        {results && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }} elevation={3}>
              <Typography variant="h6" gutterBottom>
                Analysis Results
              </Typography>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(results.data, null, 2)}
              </pre>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ContentAnalysis;
