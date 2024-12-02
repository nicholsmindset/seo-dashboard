import axios from 'axios';

const AI_PROVIDERS = {
  OPENAI: 'openai',
  CLAUDE: 'claude',
  PERPLEXITY: 'perplexity',
  OPENROUTER: 'openrouter',
  JINA: 'jina'
};

class AIService {
  constructor() {
    this.clients = {};
    this.initializeClients();
  }

  initializeClients() {
    // OpenAI Client
    this.clients[AI_PROVIDERS.OPENAI] = axios.create({
      baseURL: 'https://api.openai.com/v1',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Claude Client
    this.clients[AI_PROVIDERS.CLAUDE] = axios.create({
      baseURL: 'https://api.anthropic.com/v1',
      headers: {
        'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      }
    });

    // Perplexity Client
    this.clients[AI_PROVIDERS.PERPLEXITY] = axios.create({
      baseURL: 'https://api.perplexity.ai',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // OpenRouter Client
    this.clients[AI_PROVIDERS.OPENROUTER] = axios.create({
      baseURL: 'https://openrouter.ai/api/v1',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Jina Client
    this.clients[AI_PROVIDERS.JINA] = axios.create({
      baseURL: 'https://api.jina.ai/v1',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_JINA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async analyzeContent(content, provider = AI_PROVIDERS.OPENAI) {
    try {
      switch (provider) {
        case AI_PROVIDERS.OPENAI:
          return await this.analyzeWithOpenAI(content);
        case AI_PROVIDERS.CLAUDE:
          return await this.analyzeWithClaude(content);
        case AI_PROVIDERS.PERPLEXITY:
          return await this.analyzeWithPerplexity(content);
        case AI_PROVIDERS.OPENROUTER:
          return await this.analyzeWithOpenRouter(content);
        case AI_PROVIDERS.JINA:
          return await this.analyzeWithJina(content);
        default:
          throw new Error('Invalid AI provider');
      }
    } catch (error) {
      console.error(`Error analyzing content with ${provider}:`, error);
      throw error;
    }
  }

  async analyzeWithOpenAI(content) {
    const response = await this.clients[AI_PROVIDERS.OPENAI].post('/chat/completions', {
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: 'You are an expert SEO content analyzer.' },
        { role: 'user', content: `Analyze this content for SEO optimization: ${content}` }
      ]
    });
    return response.data;
  }

  async analyzeWithClaude(content) {
    const response = await this.clients[AI_PROVIDERS.CLAUDE].post('/messages', {
      model: 'claude-3-opus-20240229',
      messages: [
        { role: 'user', content: `Analyze this content for SEO optimization: ${content}` }
      ]
    });
    return response.data;
  }

  async analyzeWithPerplexity(content) {
    const response = await this.clients[AI_PROVIDERS.PERPLEXITY].post('/chat/completions', {
      model: 'pplx-7b-online',
      messages: [
        { role: 'system', content: 'You are an expert SEO content analyzer.' },
        { role: 'user', content: `Analyze this content for SEO optimization: ${content}` }
      ]
    });
    return response.data;
  }

  async analyzeWithOpenRouter(content) {
    const response = await this.clients[AI_PROVIDERS.OPENROUTER].post('/chat/completions', {
      model: 'anthropic/claude-3-opus',
      messages: [
        { role: 'system', content: 'You are an expert SEO content analyzer.' },
        { role: 'user', content: `Analyze this content for SEO optimization: ${content}` }
      ]
    });
    return response.data;
  }

  async analyzeWithJina(content) {
    const response = await this.clients[AI_PROVIDERS.JINA].post('/embeddings', {
      text: content,
      options: {
        task: 'seo_analysis',
        include_metadata: true
      }
    });
    return response.data;
  }
}

export const aiService = new AIService();
export { AI_PROVIDERS };
