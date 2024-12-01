import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Psychology as PsychologyIcon,
  Lightbulb as LightbulbIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';

const ContentBriefs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openNewBrief, setOpenNewBrief] = useState(false);
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    targetKeywords: '',
    searchIntent: '',
    wordCount: '',
    dueDate: '',
    competitors: '',
    outline: '',
    notes: '',
    status: 'Draft',
    priority: 'Medium',
    assignedTo: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  // Mock data for content briefs
  const [briefs, setBriefs] = useState([
    {
      id: 1,
      title: 'Ultimate Guide to Technical SEO',
      status: 'In Progress',
      priority: 'High',
      targetKeywords: ['technical seo', 'seo guide', 'website optimization'],
      searchIntent: 'Educational',
      wordCount: '3000-4000',
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-02-15',
      competitors: [
        'Moz Blog',
        'Ahrefs Blog',
        'Search Engine Journal'
      ],
      outline: [
        'Introduction to Technical SEO',
        'Website Architecture',
        'Site Speed Optimization',
        'Mobile Optimization',
        'XML Sitemaps',
        'Robots.txt',
        'Structured Data'
      ],
      notes: 'Focus on actionable tips and include case studies'
    },
    {
      id: 2,
      title: 'E-commerce SEO Strategies for 2024',
      status: 'Draft',
      priority: 'Medium',
      targetKeywords: ['ecommerce seo', 'online store optimization'],
      searchIntent: 'Commercial',
      wordCount: '2500-3000',
      assignedTo: 'Mike Chen',
      dueDate: '2024-02-20',
      competitors: [
        'Shopify Blog',
        'BigCommerce Blog',
        'Search Engine Watch'
      ],
      outline: [
        'Current E-commerce SEO Trends',
        'Product Page Optimization',
        'Category Page Best Practices',
        'Internal Linking Strategy',
        'Schema Markup for E-commerce'
      ],
      notes: 'Include real-world examples and ROI metrics'
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleBriefClick = (brief) => {
    setSelectedBrief(brief);
    setFormData({
      title: brief.title,
      targetKeywords: brief.targetKeywords.join(', '),
      searchIntent: brief.searchIntent,
      wordCount: brief.wordCount,
      dueDate: brief.dueDate,
      competitors: brief.competitors.join('\n'),
      outline: brief.outline.join('\n'),
      notes: brief.notes,
      status: brief.status,
      priority: brief.priority,
      assignedTo: brief.assignedTo,
    });
    setOpenNewBrief(true);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSaveBrief = () => {
    const newBrief = {
      id: selectedBrief ? selectedBrief.id : briefs.length + 1,
      title: formData.title,
      status: formData.status,
      priority: formData.priority,
      targetKeywords: formData.targetKeywords.split(',').map(k => k.trim()),
      searchIntent: formData.searchIntent,
      wordCount: formData.wordCount,
      assignedTo: formData.assignedTo,
      dueDate: formData.dueDate,
      competitors: formData.competitors.split('\n').map(c => c.trim()),
      outline: formData.outline.split('\n').map(o => o.trim()),
      notes: formData.notes,
    };

    if (selectedBrief) {
      setBriefs(briefs.map(brief => brief.id === selectedBrief.id ? newBrief : brief));
    } else {
      setBriefs([...briefs, newBrief]);
    }

    setOpenNewBrief(false);
    setSelectedBrief(null);
    setFormData({
      title: '',
      targetKeywords: '',
      searchIntent: '',
      wordCount: '',
      dueDate: '',
      competitors: '',
      outline: '',
      notes: '',
      status: 'Draft',
      priority: 'Medium',
      assignedTo: '',
    });
  };

  // Mock AI generation function (replace with actual API call)
  const generateAiSuggestions = async (prompt) => {
    setIsGenerating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI response
    const suggestions = {
      title: prompt.includes('ecommerce') 
        ? 'Ultimate E-commerce SEO Guide 2024: Boost Your Online Store Rankings'
        : 'Complete Technical SEO Checklist: Optimize Your Website Like a Pro',
      keywords: prompt.includes('ecommerce')
        ? ['ecommerce seo', 'online store optimization', 'product page seo', 'category page optimization', 'ecommerce keyword research']
        : ['technical seo', 'website optimization', 'site speed', 'mobile seo', 'xml sitemaps'],
      outline: prompt.includes('ecommerce') ? [
        'Introduction to E-commerce SEO',
        'Essential E-commerce SEO Elements',
        'Product Page Optimization Guide',
        'Category Page Best Practices',
        'Internal Linking for E-commerce',
        'Technical SEO for Online Stores',
        'Mobile Optimization Tips',
        'Schema Markup Implementation',
        'Performance Optimization',
        'Measuring E-commerce SEO Success'
      ] : [
        'Understanding Technical SEO',
        'Site Architecture Best Practices',
        'Speed Optimization Techniques',
        'Mobile-First Optimization',
        'Advanced Robots.txt Configuration',
        'XML Sitemap Strategy',
        'Schema Markup Implementation',
        'Security and SSL',
        'JavaScript SEO Considerations',
        'Technical SEO Audit Process'
      ],
      competitors: prompt.includes('ecommerce') ? [
        'Shopify Blog',
        'BigCommerce Blog',
        'Volusion Blog',
        'Search Engine Journal E-commerce Section',
        'Practical E-commerce'
      ] : [
        'Moz Blog',
        'Ahrefs Blog',
        'Search Engine Journal',
        'SEMrush Blog',
        'Web.dev'
      ]
    };

    setAiSuggestions(suggestions);
    setIsGenerating(false);
  };

  const applyAiSuggestions = () => {
    if (!aiSuggestions) return;

    setFormData({
      ...formData,
      title: aiSuggestions.title,
      targetKeywords: aiSuggestions.keywords.join(', '),
      outline: aiSuggestions.outline.join('\n'),
      competitors: aiSuggestions.competitors.join('\n')
    });

    setAiSuggestions(null);
  };

  const filteredBriefs = briefs
    .filter(brief => {
      // Filter by tab
      if (selectedTab === 1 && brief.status !== 'In Progress') return false;
      if (selectedTab === 2 && brief.status !== 'Completed') return false;
      if (selectedTab === 3 && brief.status !== 'Draft') return false;

      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          brief.title.toLowerCase().includes(searchLower) ||
          brief.targetKeywords.some(k => k.toLowerCase().includes(searchLower)) ||
          brief.assignedTo.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Content Briefs
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedBrief(null);
              setFormData({
                title: '',
                targetKeywords: '',
                searchIntent: '',
                wordCount: '',
                dueDate: '',
                competitors: '',
                outline: '',
                notes: '',
                status: 'Draft',
                priority: 'Medium',
                assignedTo: '',
              });
              setOpenNewBrief(true);
            }}
          >
            Create Brief
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search briefs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                  }}
                  sx={{ flex: 1 }}
                />
              </Box>

              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
              >
                <Tab label="All Briefs" />
                <Tab label="In Progress" />
                <Tab label="Completed" />
                <Tab label="Draft" />
              </Tabs>
            </Paper>
          </Grid>

          {filteredBriefs.map((brief) => (
            <Grid item xs={12} md={6} lg={4} key={brief.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {brief.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={brief.status}
                      color={
                        brief.status === 'In Progress' ? 'warning' :
                        brief.status === 'Completed' ? 'success' :
                        'default'
                      }
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={brief.priority}
                      color={
                        brief.priority === 'High' ? 'error' :
                        brief.priority === 'Medium' ? 'warning' :
                        'default'
                      }
                      size="small"
                    />
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <KeyboardArrowRightIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Target Keywords"
                        secondary={brief.targetKeywords.join(', ')}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <GroupIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Assigned To"
                        secondary={brief.assignedTo}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <ScheduleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Due Date"
                        secondary={brief.dueDate}
                      />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleBriefClick(brief)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<FileCopyIcon />}
                    onClick={() => {
                      const duplicatedBrief = {
                        ...brief,
                        id: briefs.length + 1,
                        title: `${brief.title} (Copy)`,
                        status: 'Draft'
                      };
                      setBriefs([...briefs, duplicatedBrief]);
                    }}
                  >
                    Duplicate
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setBriefs(briefs.filter(b => b.id !== brief.id));
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* New/Edit Brief Dialog */}
        <Dialog
          open={openNewBrief}
          onClose={() => {
            setOpenNewBrief(false);
            setSelectedBrief(null);
            setAiSuggestions(null);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">
                {selectedBrief ? 'Edit Content Brief' : 'Create Content Brief'}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AutoAwesomeIcon />}
                onClick={() => generateAiSuggestions(formData.title || 'seo guide')}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'AI Assist'}
              </Button>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              {aiSuggestions && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LightbulbIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">AI Suggestions</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Based on your input, here's an optimized content brief:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <PsychologyIcon sx={{ color: 'primary.contrastText' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Suggested Title"
                        secondary={aiSuggestions.title}
                        secondaryTypographyProps={{ sx: { color: 'primary.contrastText' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <KeyboardArrowRightIcon sx={{ color: 'primary.contrastText' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Target Keywords"
                        secondary={aiSuggestions.keywords.join(', ')}
                        secondaryTypographyProps={{ sx: { color: 'primary.contrastText' } }}
                      />
                    </ListItem>
                  </List>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={applyAiSuggestions}
                    >
                      Apply Suggestions
                    </Button>
                  </Box>
                </Paper>
              )}
              <TextField
                fullWidth
                label="Brief Title"
                value={formData.title}
                onChange={handleInputChange('title')}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={handleInputChange('status')}
                      label="Status"
                    >
                      <MenuItem value="Draft">Draft</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={formData.priority}
                      onChange={handleInputChange('priority')}
                      label="Priority"
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Target Keywords"
                    value={formData.targetKeywords}
                    onChange={handleInputChange('targetKeywords')}
                    multiline
                    rows={2}
                    helperText="Separate keywords with commas"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Search Intent"
                    value={formData.searchIntent}
                    onChange={handleInputChange('searchIntent')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Word Count"
                    value={formData.wordCount}
                    onChange={handleInputChange('wordCount')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Assigned To"
                    value={formData.assignedTo}
                    onChange={handleInputChange('assignedTo')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Due Date"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange('dueDate')}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Competitors to Analyze"
                    value={formData.competitors}
                    onChange={handleInputChange('competitors')}
                    multiline
                    rows={3}
                    helperText="One competitor per line"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Content Outline"
                    value={formData.outline}
                    onChange={handleInputChange('outline')}
                    multiline
                    rows={6}
                    helperText="One section per line"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Additional Notes"
                    value={formData.notes}
                    onChange={handleInputChange('notes')}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpenNewBrief(false);
              setSelectedBrief(null);
            }}>
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={handleSaveBrief}
              disabled={!formData.title || !formData.targetKeywords}
            >
              Save Brief
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ContentBriefs;
