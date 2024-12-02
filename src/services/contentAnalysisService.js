// Get your Jina AI API key for free: https://jina.ai/?sui=apikey
import axios from 'axios';

const JINA_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.REACT_APP_JINA_API_KEY}`
};

// Analyze competitor content
export const analyzeCompetitorContent = async (url) => {
  try {
    // First, read the content using r.reader API
    const readerResponse = await axios.post('https://r.jina.ai/', 
      { url },
      { 
        headers: {
          ...JINA_HEADERS,
          'X-With-Links-Summary': 'true',
          'X-With-Images-Summary': 'true'
        }
      }
    );

    const content = readerResponse.data.data.content;
    const links = readerResponse.data.data.links;
    const images = readerResponse.data.data.images;

    // Generate embeddings for the content
    const embeddingsResponse = await axios.post('https://api.jina.ai/v1/embeddings',
      {
        model: 'jina-embeddings-v3',
        input: [content],
        task: 'retrieval.passage'
      },
      { headers: JINA_HEADERS }
    );

    return {
      content,
      links,
      images,
      embedding: embeddingsResponse.data.data[0].embedding
    };
  } catch (error) {
    console.error('Error analyzing competitor content:', error);
    throw error;
  }
};

// Identify content gaps by comparing with competitors
export const identifyContentGaps = async (yourContent, competitorUrls) => {
  try {
    // Get competitor content
    const competitorAnalyses = await Promise.all(
      competitorUrls.map(url => analyzeCompetitorContent(url))
    );

    // Classify content topics
    const allContent = [yourContent, ...competitorAnalyses.map(a => a.content)];
    const classificationResponse = await axios.post('https://api.jina.ai/v1/classify',
      {
        model: 'jina-embeddings-v3',
        input: allContent,
        labels: [
          'Technical SEO',
          'Content Marketing',
          'Link Building',
          'Local SEO',
          'Mobile SEO',
          'E-commerce SEO',
          'International SEO'
        ]
      },
      { headers: JINA_HEADERS }
    );

    // Compare topics and identify gaps
    const yourTopics = classificationResponse.data.data[0].predictions;
    const competitorTopics = classificationResponse.data.data
      .slice(1)
      .map(result => result.predictions);

    return {
      yourTopics,
      competitorTopics,
      gaps: identifyTopicGaps(yourTopics, competitorTopics)
    };
  } catch (error) {
    console.error('Error identifying content gaps:', error);
    throw error;
  }
};

// Analyze content freshness
export const analyzeContentFreshness = async (url) => {
  try {
    // Use grounding API to verify content freshness
    const statement = `The content at ${url} is up-to-date and contains recent information.`;
    const groundingResponse = await axios.post('https://g.jina.ai/',
      { statement },
      { 
        headers: JINA_HEADERS,
        'X-Site': url
      }
    );

    return {
      isUpToDate: groundingResponse.data.data.result,
      confidence: groundingResponse.data.data.factuality,
      reason: groundingResponse.data.data.reason,
      references: groundingResponse.data.data.references
    };
  } catch (error) {
    console.error('Error analyzing content freshness:', error);
    throw error;
  }
};

// Search for relevant content ideas
export const searchContentIdeas = async (topic) => {
  try {
    // Search for relevant content
    const searchResponse = await axios.post('https://s.jina.ai/',
      { 
        q: `latest trends and ideas for ${topic} content`,
        options: 'Markdown'
      },
      { headers: JINA_HEADERS }
    );

    // Rerank the results for better relevance
    const documents = searchResponse.data.data.map(result => result.content);
    const rerankerResponse = await axios.post('https://api.jina.ai/v1/rerank',
      {
        model: 'jina-reranker-v2-base-multilingual',
        query: `What are the most innovative and effective ${topic} content strategies?`,
        documents,
        top_n: 5
      },
      { headers: JINA_HEADERS }
    );

    return rerankerResponse.data.results.map(result => ({
      content: result.document.text,
      relevanceScore: result.relevance_score
    }));
  } catch (error) {
    console.error('Error searching content ideas:', error);
    throw error;
  }
};

// Helper function to identify topic gaps
const identifyTopicGaps = (yourTopics, competitorTopics) => {
  const gaps = [];
  
  competitorTopics.forEach(competitor => {
    competitor.forEach(topic => {
      const yourScore = yourTopics.find(t => t.label === topic.label)?.score || 0;
      if (topic.score > yourScore + 0.2) { // 20% threshold for identifying gaps
        gaps.push({
          topic: topic.label,
          scoreDifference: topic.score - yourScore,
          recommendation: `Consider strengthening your content on ${topic.label}`
        });
      }
    });
  });

  return gaps;
};
