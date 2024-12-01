import axios from 'axios';

// OpenAI Service
export const openaiService = {
  async generateContent(prompt, apiKey) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }]
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
};

// Perplexity Service
export const perplexityService = {
  async searchInsights(query, apiKey) {
    try {
      const response = await axios.post(
        'https://api.perplexity.ai/v1/search',
        { query },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.results;
    } catch (error) {
      console.error('Perplexity API Error:', error);
      throw error;
    }
  }
};

// Claude (Anthropic) Service
export const claudeService = {
  async generateText(prompt, apiKey) {
    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/complete',
        {
          prompt: prompt,
          model: "claude-v1",
          max_tokens_to_sample: 300
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.completion;
    } catch (error) {
      console.error('Claude API Error:', error);
      throw error;
    }
  }
};

// Jina.ai Service
export const jinaaiService = {
  async multimodalSearch(query, apiKey) {
    try {
      const response = await axios.post(
        'https://api.jina.ai/v1/multimodal-search',
        { query },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.results;
    } catch (error) {
      console.error('Jina.ai API Error:', error);
      throw error;
    }
  }
};

// Centralized AI Service Manager
export const AIServiceManager = {
  async executeAITask(service, method, params, apiKey) {
    const services = {
      openai: openaiService,
      perplexity: perplexityService,
      claude: claudeService,
      jinaai: jinaaiService
    };

    if (!services[service]) {
      throw new Error(`Unsupported AI service: ${service}`);
    }

    if (!services[service][method]) {
      throw new Error(`Method ${method} not found for service ${service}`);
    }

    return services[service][method](params, apiKey);
  }
};
