// Get your Jina AI API key for free: https://jina.ai/?sui=apikey
import axios from 'axios';

const JINA_API_KEY = process.env.REACT_APP_JINA_API_KEY;
const JINA_API_BASE_URL = 'https://api.jina.ai/v1';

const jinaClient = axios.create({
  baseURL: JINA_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${JINA_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Analyze content structure
export const analyzeContentStructure = async (content) => {
  try {
    const response = await jinaClient.post('/segmenter', {
      text: content,
      options: {
        granularity: 'paragraph',
        include_metadata: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing content structure:', error);
    throw new Error('Failed to analyze content structure');
  }
};

// Analyze semantic similarity
export const analyzeSemanticSimilarity = async (content, targetContent) => {
  try {
    const response = await jinaClient.post('/embeddings', {
      texts: [content, targetContent],
      options: {
        task: 'similarity',
        include_metadata: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing semantic similarity:', error);
    throw new Error('Failed to analyze semantic similarity');
  }
};

// Analyze featured snippet potential
export const analyzeFeaturedSnippetPotential = async (content) => {
  try {
    const response = await jinaClient.post('/classifier', {
      text: content,
      options: {
        task: 'featured_snippet',
        include_metadata: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing featured snippet potential:', error);
    throw new Error('Failed to analyze featured snippet potential');
  }
};

// Optimize content
export const optimizeContent = async (content, targetKeywords) => {
  try {
    const response = await jinaClient.post('/optimizer', {
      text: content,
      keywords: targetKeywords,
      options: {
        include_suggestions: true,
        include_metadata: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error optimizing content:', error);
    throw new Error('Failed to optimize content');
  }
};
