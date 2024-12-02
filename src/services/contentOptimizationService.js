// Get your Jina AI API key for free: https://jina.ai/?sui=apikey
import axios from 'axios';

const JINA_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.REACT_APP_JINA_API_KEY}`
};

// Analyze content readability and structure
export const analyzeContentStructure = async (content) => {
  try {
    // Split content into segments for analysis
    const segmentResponse = await axios.post('https://segment.jina.ai/',
      {
        content,
        tokenizer: 'cl100k_base',
        return_chunks: true,
        max_chunk_length: 500
      },
      { headers: JINA_HEADERS }
    );

    const chunks = segmentResponse.data.chunks;

    // Classify each chunk to understand content structure
    const classificationResponse = await axios.post('https://api.jina.ai/v1/classify',
      {
        model: 'jina-embeddings-v3',
        input: chunks,
        labels: [
          'Introduction',
          'Main Content',
          'Supporting Evidence',
          'Technical Details',
          'Conclusion',
          'Call to Action'
        ]
      },
      { headers: JINA_HEADERS }
    );

    return {
      segments: chunks.map((chunk, index) => ({
        content: chunk,
        classification: classificationResponse.data.data[index].prediction,
        confidence: classificationResponse.data.data[index].score
      })),
      structureAnalysis: analyzeContentBalance(classificationResponse.data.data)
    };
  } catch (error) {
    console.error('Error analyzing content structure:', error);
    throw error;
  }
};

// Analyze semantic similarity with top-performing content
export const analyzeSemanticSimilarity = async (content, topUrls) => {
  try {
    // Get content from top-performing URLs
    const topContent = await Promise.all(
      topUrls.map(async (url) => {
        const response = await axios.post('https://r.jina.ai/',
          { url },
          { headers: JINA_HEADERS }
        );
        return response.data.data.content;
      })
    );

    // Generate embeddings for all content
    const embeddingsResponse = await axios.post('https://api.jina.ai/v1/embeddings',
      {
        model: 'jina-embeddings-v3',
        input: [content, ...topContent],
        task: 'text-matching'
      },
      { headers: JINA_HEADERS }
    );

    // Calculate similarities
    const yourEmbedding = embeddingsResponse.data.data[0].embedding;
    const similarities = topContent.map((_, index) => ({
      url: topUrls[index],
      similarity: calculateCosineSimilarity(
        yourEmbedding,
        embeddingsResponse.data.data[index + 1].embedding
      )
    }));

    return {
      similarities,
      averageSimilarity: similarities.reduce((acc, curr) => acc + curr.similarity, 0) / similarities.length
    };
  } catch (error) {
    console.error('Error analyzing semantic similarity:', error);
    throw error;
  }
};

// Identify potential featured snippet opportunities
export const analyzeFeaturedSnippetPotential = async (content, query) => {
  try {
    // Search for current featured snippets
    const searchResponse = await axios.post('https://s.jina.ai/',
      {
        q: query,
        options: 'Markdown'
      },
      { headers: JINA_HEADERS }
    );

    // Get top results
    const topResults = searchResponse.data.data.slice(0, 5).map(r => r.content);

    // Compare your content with top results
    const rerankerResponse = await axios.post('https://api.jina.ai/v1/rerank',
      {
        model: 'jina-reranker-v2-base-multilingual',
        query: query,
        documents: [content, ...topResults]
      },
      { headers: JINA_HEADERS }
    );

    // Analyze potential
    const yourScore = rerankerResponse.data.results[0].relevance_score;
    const competitorScores = rerankerResponse.data.results.slice(1);

    return {
      featuredSnippetPotential: yourScore > Math.max(...competitorScores.map(s => s.relevance_score)),
      relevanceScore: yourScore,
      competitorScores: competitorScores.map((score, index) => ({
        content: topResults[index],
        score: score.relevance_score
      })),
      recommendations: generateSnippetRecommendations(yourScore, competitorScores)
    };
  } catch (error) {
    console.error('Error analyzing featured snippet potential:', error);
    throw error;
  }
};

// Helper function to analyze content balance
const analyzeContentBalance = (classifications) => {
  const distribution = classifications.reduce((acc, curr) => {
    acc[curr.prediction] = (acc[curr.prediction] || 0) + 1;
    return acc;
  }, {});

  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  const percentages = Object.entries(distribution).reduce((acc, [key, value]) => {
    acc[key] = (value / total) * 100;
    return acc;
  }, {});

  return {
    distribution: percentages,
    recommendations: generateBalanceRecommendations(percentages)
  };
};

// Helper function to calculate cosine similarity
const calculateCosineSimilarity = (vec1, vec2) => {
  const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
  const norm1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
  const norm2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (norm1 * norm2);
};

// Helper function to generate snippet recommendations
const generateSnippetRecommendations = (yourScore, competitorScores) => {
  const recommendations = [];
  const avgCompetitorScore = competitorScores.reduce((acc, curr) => acc + curr.relevance_score, 0) / competitorScores.length;

  if (yourScore < avgCompetitorScore) {
    recommendations.push('Add more direct answers to the target query');
    recommendations.push('Structure content with clear headings and bullet points');
    recommendations.push('Include relevant statistics or data points');
  }

  if (yourScore > avgCompetitorScore) {
    recommendations.push('Maintain current content structure');
    recommendations.push('Consider adding schema markup for better visibility');
    recommendations.push('Keep content updated with fresh data and statistics');
  }

  return recommendations;
};

// Helper function to generate balance recommendations
const generateBalanceRecommendations = (percentages) => {
  const recommendations = [];

  if (!percentages['Introduction'] || percentages['Introduction'] < 10) {
    recommendations.push('Consider adding a stronger introduction');
  }

  if (!percentages['Supporting Evidence'] || percentages['Supporting Evidence'] < 20) {
    recommendations.push('Add more supporting evidence or examples');
  }

  if (!percentages['Conclusion'] || percentages['Conclusion'] < 10) {
    recommendations.push('Strengthen the conclusion section');
  }

  if (!percentages['Call to Action'] || percentages['Call to Action'] < 5) {
    recommendations.push('Add a clear call to action');
  }

  return recommendations;
};
