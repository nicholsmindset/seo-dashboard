import React, { useState } from 'react';
import {
  Box,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [yourUrl, setYourUrl] = useState('');
  const [competitorUrls, setCompetitorUrls] = useState(['']);
  const [topic, setTopic] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [contentIdeas, setContentIdeas] = useState([]);

  const handleCompetitorUrlChange = (index, value) => {
    const newUrls = [...competitorUrls];
    newUrls[index] = value;
    setCompetitorUrls(newUrls);
  };

  const addCompetitorUrl = () => {
    setCompetitorUrls([...competitorUrls, '']);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      // Analyze your content
      const yourContent = await analyzeCompetitorContent(yourUrl);
      
      // Filter out empty competitor URLs
      const validCompetitorUrls = competitorUrls.filter(url => url.trim());
      
      // Analyze gaps
      const gapsAnalysis = await identifyContentGaps(
        yourContent.content,
        validCompetitorUrls
      );

      // Check content freshness
      const freshnessAnalysis = await analyzeContentFreshness(yourUrl);

      setAnalysisResults({
        contentGaps: gapsAnalysis.gaps,
        freshness: freshnessAnalysis,
        yourTopics: gapsAnalysis.yourTopics
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchIdeas = async () => {
    setLoading(true);
    setError(null);
    try {
      const ideas = await searchContentIdeas(topic);
      setContentIdeas(ideas);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Content Analysis
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Compare with Competitors
        </Typography>
        
        <TextField
          fullWidth
          label="Your Content URL"
          value={yourUrl}
          onChange={(e) => setYourUrl(e.target.value)}
          sx={{ mb: 2 }}
        />

        {competitorUrls.map((url, index) => (
          <TextField
            key={index}
            fullWidth
            label={`Competitor URL ${index + 1}`}
            value={url}
            onChange={(e) => handleCompetitorUrlChange(index, e.target.value)}
            sx={{ mb: 2 }}
          />
        ))}

        <Button onClick={addCompetitorUrl} sx={{ mb: 2 }}>
          Add Competitor
        </Button>

        <Button
          variant="contained"
          onClick={handleAnalyze}
          disabled={loading}
          sx={{ ml: 2, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze'}
        </Button>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search Content Ideas
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
          onClick={handleSearchIdeas}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Search Ideas'}
        </Button>
      </Paper>

      {analysisResults && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Analysis Results
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Your Content Topics:
          </Typography>
          <Box sx={{ mb: 2 }}>
            {analysisResults.yourTopics.map((topic, index) => (
              <Chip
                key={index}
                label={`${topic.label}: ${(topic.score * 100).toFixed(1)}%`}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Content Gaps:
          </Typography>
          <List>
            {analysisResults.contentGaps.map((gap, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={gap.topic}
                  secondary={gap.recommendation}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle1" gutterBottom>
            Content Freshness:
          </Typography>
          <Alert severity={analysisResults.freshness.isUpToDate ? "success" : "warning"}>
            {analysisResults.freshness.reason}
          </Alert>
        </Paper>
      )}

      {contentIdeas.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Content Ideas
          </Typography>
          <List>
            {contentIdeas.map((idea, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={idea.content}
                  secondary={`Relevance Score: ${(idea.relevanceScore * 100).toFixed(1)}%`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ContentAnalysis;
