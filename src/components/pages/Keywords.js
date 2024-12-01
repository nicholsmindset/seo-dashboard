import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Tooltip,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
  Psychology as PsychologyIcon,
  Lightbulb as LightbulbIcon,
  AutoAwesome as AutoAwesomeIcon,
  Insights as InsightsIcon,
  Timeline as TimelineIcon,
  TrendingDown as TrendingDownIcon,
  ImportExport as ImportExportIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const Keywords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddKeyword, setOpenAddKeyword] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [keywords, setKeywords] = useState([
    {
      id: 1,
      keyword: 'best seo practices 2024',
      volume: 12500,
      difficulty: 67,
      currentRank: 3,
      previousRank: 5,
      intent: 'Informational',
      traffic: 850,
      conversion: 2.5,
      trend: [
        { x: '2023-12', y: 8 },
        { x: '2024-01', y: 5 },
        { x: '2024-02', y: 3 }
      ]
    },
    {
      id: 2,
      keyword: 'seo tools comparison',
      volume: 8200,
      difficulty: 45,
      currentRank: 7,
      previousRank: 12,
      intent: 'Commercial',
      traffic: 620,
      conversion: 3.8,
      trend: [
        { x: '2023-12', y: 15 },
        { x: '2024-01', y: 10 },
        { x: '2024-02', y: 7 }
      ]
    }
  ]);

  const [openAiDialog, setOpenAiDialog] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);

  // Mock AI analysis function (replace with actual API call)
  const generateKeywordInsights = async (keyword) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const insights = {
      difficulty: {
        score: Math.floor(Math.random() * 100),
        factors: [
          'High competition from authority domains',
          'Complex topic requiring in-depth content',
          'Long-form content dominates top results'
        ]
      },
      contentSuggestions: [
        'Create comprehensive how-to guides',
        'Include step-by-step tutorials',
        'Add expert interviews and case studies',
        'Use data-driven infographics'
      ],
      relatedKeywords: [
        { keyword: keyword + ' tutorial', volume: Math.floor(Math.random() * 10000) },
        { keyword: 'best ' + keyword + ' tools', volume: Math.floor(Math.random() * 8000) },
        { keyword: keyword + ' examples', volume: Math.floor(Math.random() * 6000) },
        { keyword: 'how to ' + keyword, volume: Math.floor(Math.random() * 12000) }
      ],
      seasonalTrends: {
        peak: 'Q4',
        trend: 'Upward',
        notes: 'Higher search volume during business planning seasons'
      },
      competitorAnalysis: [
        { domain: 'competitor1.com', authority: 85, contentType: 'Guide' },
        { domain: 'competitor2.com', authority: 78, contentType: 'Tutorial' },
        { domain: 'competitor3.com', authority: 92, contentType: 'Tool' }
      ]
    };

    setAiInsights(insights);
    setIsAnalyzing(false);
  };

  const renderAiInsightsDialog = () => (
    <Dialog
      open={openAiDialog}
      onClose={() => {
        setOpenAiDialog(false);
        setAiInsights(null);
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PsychologyIcon color="primary" />
          <Typography variant="h6">
            AI Keyword Analysis: {selectedKeyword?.keyword}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        {isAnalyzing ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <AutoAwesomeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Analyzing Keyword Data
            </Typography>
            <LinearProgress sx={{ mx: 'auto', maxWidth: 400, mb: 2 }} />
            <Typography color="textSecondary">
              Our AI is analyzing search patterns, competition, and content opportunities...
            </Typography>
          </Box>
        ) : aiInsights ? (
          <Box sx={{ mt: 2 }}>
            {/* Difficulty Analysis */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                Difficulty Analysis
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={aiInsights.difficulty.score}
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: aiInsights.difficulty.score > 70 ? '#ff4444' :
                                aiInsights.difficulty.score > 40 ? '#ffbb33' : '#00C851'
                      }
                    }}
                  />
                </Box>
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {aiInsights.difficulty.score}/100
                </Typography>
              </Box>
              <List dense>
                {aiInsights.difficulty.factors.map((factor, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <InsightsIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary={factor} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Content Suggestions */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Content Strategy Suggestions
              </Typography>
              <List dense>
                {aiInsights.contentSuggestions.map((suggestion, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <LightbulbIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Related Keywords */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Related Keywords
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Keyword</TableCell>
                      <TableCell align="right">Volume</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aiInsights.relatedKeywords.map((kw, index) => (
                      <TableRow key={index}>
                        <TableCell>{kw.keyword}</TableCell>
                        <TableCell align="right">{kw.volume.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setKeywords([...keywords, {
                                id: keywords.length + 1,
                                keyword: kw.keyword,
                                volume: kw.volume,
                                difficulty: Math.floor(Math.random() * 100),
                                currentRank: Math.floor(Math.random() * 100),
                                previousRank: Math.floor(Math.random() * 100),
                                intent: 'Informational',
                                traffic: Math.floor(Math.random() * 1000),
                                conversion: Math.floor(Math.random() * 10) / 10,
                                trend: [
                                  { x: '2023-12', y: Math.floor(Math.random() * 10) },
                                  { x: '2024-01', y: Math.floor(Math.random() * 10) },
                                  { x: '2024-02', y: Math.floor(Math.random() * 10) }
                                ]
                              }]);
                            }}
                          >
                            Track
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Competitor Analysis */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Competitor Analysis
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Domain</TableCell>
                      <TableCell align="right">Authority</TableCell>
                      <TableCell>Content Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aiInsights.competitorAnalysis.map((competitor, index) => (
                      <TableRow key={index}>
                        <TableCell>{competitor.domain}</TableCell>
                        <TableCell align="right">{competitor.authority}</TableCell>
                        <TableCell>{competitor.contentType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setOpenAiDialog(false);
          setAiInsights(null);
        }}>
          Close
        </Button>
        {!isAnalyzing && aiInsights && (
          <Button
            variant="contained"
            onClick={() => {
              // Export insights as PDF or add to content brief
              setOpenAiDialog(false);
            }}
          >
            Export Insights
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
    setOpenAddKeyword(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Keyword Tracking
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ImportExportIcon />}
            >
              Import/Export
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddKeyword(true)}
            >
              Add Keywords
            </Button>
          </Box>
        </Box>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Keywords
                </Typography>
                <Typography variant="h4">
                  {keywords.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Avg. Position
                </Typography>
                <Typography variant="h4">
                  5.2
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Top 10 Rankings
                </Typography>
                <Typography variant="h4">
                  24
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Search Volume
                </Typography>
                <Typography variant="h4">
                  45.2K
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              size="small"
              placeholder="Search keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
              sx={{ flex: 1 }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="7d">7 Days</MenuItem>
                <MenuItem value="30d">30 Days</MenuItem>
                <MenuItem value="90d">90 Days</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Keyword</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell align="right">Difficulty</TableCell>
                  <TableCell align="center">Ranking</TableCell>
                  <TableCell align="center">Trend</TableCell>
                  <TableCell align="right">Traffic</TableCell>
                  <TableCell align="right">Conv. Rate</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keywords.map((keyword) => (
                  <TableRow key={keyword.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{keyword.keyword}</Typography>
                        <Chip
                          label={keyword.intent}
                          size="small"
                          variant="outlined"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {keyword.volume.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <LinearProgress
                          variant="determinate"
                          value={keyword.difficulty}
                          sx={{ 
                            width: 100,
                            height: 8,
                            borderRadius: 4,
                            mr: 1,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: keyword.difficulty > 70 ? 'error.main' :
                                      keyword.difficulty > 40 ? 'warning.main' : 'success.main'
                            }
                          }}
                        />
                        {keyword.difficulty}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="subtitle2">
                          #{keyword.currentRank}
                        </Typography>
                        {keyword.currentRank < keyword.previousRank ? (
                          <TrendingUpIcon color="success" sx={{ ml: 1 }} />
                        ) : (
                          <TrendingDownIcon color="error" sx={{ ml: 1 }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ width: 120, height: 40 }}>
                      <Box sx={{ height: 40 }}>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {keyword.traffic.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {keyword.conversion}%
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => handleKeywordClick(keyword)}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="AI Analysis">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setSelectedKeyword(keyword);
                            setOpenAiDialog(true);
                            generateKeywordInsights(keyword.keyword);
                          }}
                        >
                          <PsychologyIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Keyword Details Dialog */}
        <Dialog
          open={openAddKeyword}
          onClose={() => {
            setOpenAddKeyword(false);
            setSelectedKeyword(null);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedKeyword ? 'Keyword Details' : 'Add New Keywords'}
          </DialogTitle>
          <DialogContent>
            {selectedKeyword ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedKeyword.keyword}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ height: 300 }}>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Enter Keywords"
                  placeholder="Enter one keyword per line"
                  sx={{ mb: 2 }}
                />
                <Typography variant="caption" color="textSecondary">
                  Pro Tip: You can bulk import keywords from a CSV file
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpenAddKeyword(false);
              setSelectedKeyword(null);
            }}>
              Cancel
            </Button>
            {!selectedKeyword && (
              <Button variant="contained">
                Add Keywords
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {renderAiInsightsDialog()}
      </Container>
    </Box>
  );
};

export default Keywords;
