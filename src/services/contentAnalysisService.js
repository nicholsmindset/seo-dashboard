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

// Analyze competitor content
export const analyzeCompetitorContent = async (url) => {
  try {
    const response = await jinaClient.post('/reader', {
      url,
      options: {
        include_links: true,
        include_images: true,
        include_metadata: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing competitor content:', error);
    throw new Error('Failed to analyze competitor content');
  }
};

// Identify content gaps by comparing with competitors
export const identifyContentGaps = async (yourContent, competitorUrls) => {
  try {
    const response = await jinaClient.post('/embeddings', {
      text: yourContent,
      urls: competitorUrls,
      options: {
        task: 'gap_analysis',
        include_metadata: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error identifying content gaps:', error);
    throw new Error('Failed to identify content gaps');
  }
};

// Analyze content freshness
export const analyzeContentFreshness = async (content) => {
  try {
    const response = await jinaClient.post('/classifier', {
      text: content,
      options: {
        task: 'freshness_analysis',
        include_metadata: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing content freshness:', error);
    throw new Error('Failed to analyze content freshness');
  }
};

// Search for relevant content ideas
export const searchContentIdeas = async (topic) => {
  try {
    const response = await jinaClient.post('/search', {
      query: topic,
      options: {
        limit: 10,
        include_metadata: true
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching content ideas:', error);
    throw new Error('Failed to search content ideas');
  }
};
