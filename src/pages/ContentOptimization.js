import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  analyzeContentStructure,
  analyzeSemanticSimilarity,
  analyzeFeaturedSnippetPotential
} from '../services/contentOptimizationService';

const ContentOptimization = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  const [query, setQuery] = useState('');
  const [competitorUrls, setCompetitorUrls] = useState(['']);
  const [analysisResults, setAnalysisResults] = useState(null);

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
      // Run all analyses in parallel
      const [structureAnalysis, similarityAnalysis, snippetAnalysis] = await Promise.all([
        analyzeContentStructure(content),
        analyzeSemanticSimilarity(content, competitorUrls.filter(url => url.trim())),
        analyzeFeaturedSnippetPotential(content, query)
      ]);

      setAnalysisResults({
        structure: structureAnalysis,
        similarity: similarityAnalysis,
        snippet: snippetAnalysis
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Advanced Content Optimization
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Content Analysis
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Your Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Target Query/Keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
          Add Competitor URL
        </Button>

        <Button
          variant="contained"
          onClick={handleAnalyze}
          disabled={loading || !content.trim()}
          sx={{ ml: 2, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze Content'}
        </Button>
      </Paper>

      {analysisResults && (
        <Box>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Content Structure Analysis</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1" gutterBottom>
                Content Distribution:
              </Typography>
              <Box sx={{ mb: 2 }}>
                {Object.entries(analysisResults.structure.structureAnalysis.distribution).map(([type, percentage]) => (
                  <Chip
                    key={type}
                    label={`${type}: ${percentage.toFixed(1)}%`}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>

              <Typography variant="subtitle1" gutterBottom>
                Recommendations:
              </Typography>
              <List>
                {analysisResults.structure.structureAnalysis.recommendations.map((rec, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Semantic Similarity Analysis</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1" gutterBottom>
                Average Similarity Score: {(analysisResults.similarity.averageSimilarity * 100).toFixed(1)}%
              </Typography>
              
              <List>
                {analysisResults.similarity.similarities.map((sim, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Competitor ${index + 1}`}
                      secondary={`Similarity: ${(sim.similarity * 100).toFixed(1)}%`}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Featured Snippet Potential</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Alert
                severity={analysisResults.snippet.featuredSnippetPotential ? "success" : "info"}
                sx={{ mb: 2 }}
              >
                {analysisResults.snippet.featuredSnippetPotential
                  ? "Your content has good potential for featured snippets!"
                  : "Your content might need optimization for featured snippets."}
              </Alert>

              <Typography variant="subtitle1" gutterBottom>
                Your Relevance Score: {(analysisResults.snippet.relevanceScore * 100).toFixed(1)}%
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Recommendations:
              </Typography>
              <List>
                {analysisResults.snippet.recommendations.map((rec, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Box>
  );
};

export default ContentOptimization;
