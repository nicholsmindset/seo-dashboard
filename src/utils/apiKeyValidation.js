// API Key Validation Utility
export const APIKeyValidators = {
  openai: (key) => {
    // OpenAI API key format: sk-[A-Za-z0-9]{48}
    const openaiRegex = /^sk-[A-Za-z0-9]{48}$/;
    return openaiRegex.test(key);
  },

  perplexity: (key) => {
    // Perplexity API key format (example): pplx-[A-Za-z0-9]{64}
    const perplexityRegex = /^pplx-[A-Za-z0-9]{64}$/;
    return perplexityRegex.test(key);
  },

  claude: (key) => {
    // Claude API key format (example): sk-ant-[A-Za-z0-9]{64}
    const claudeRegex = /^sk-ant-[A-Za-z0-9]{64}$/;
    return claudeRegex.test(key);
  },

  jinaai: (key) => {
    // Jina.ai API key format (example): jina-[A-Za-z0-9]{48}
    const jinaaiRegex = /^jina-[A-Za-z0-9]{48}$/;
    return jinaaiRegex.test(key);
  },

  // Validate API key for a specific provider
  validateKey: (provider, key) => {
    if (!key) return false;
    
    const validators = {
      openai: APIKeyValidators.openai,
      perplexity: APIKeyValidators.perplexity,
      claude: APIKeyValidators.claude,
      jinaai: APIKeyValidators.jinaai,
    };

    const validator = validators[provider];
    return validator ? validator(key) : false;
  },

  // Mask API key for display
  maskKey: (key) => {
    if (!key) return '';
    return key.slice(0, 5) + '****' + key.slice(-4);
  },
};

// API Key Error Handling
export class APIKeyError extends Error {
  constructor(provider, message) {
    super(message);
    this.name = 'APIKeyError';
    this.provider = provider;
  }
}

// Centralized API Key Management
export const APIKeyManager = {
  // Store API key with validation
  storeAPIKey: (provider, key) => {
    // Validate key
    if (!APIKeyValidators.validateKey(provider, key)) {
      throw new APIKeyError(provider, 'Invalid API key format');
    }

    // Store in localStorage
    localStorage.setItem(`${provider}_api_key`, key);
    
    // Optional: Log key storage (without exposing full key)
    console.log(`API key for ${provider} stored successfully`);
  },

  // Retrieve API key
  getAPIKey: (provider) => {
    return localStorage.getItem(`${provider}_api_key`) || '';
  },

  // Remove API key
  removeAPIKey: (provider) => {
    localStorage.removeItem(`${provider}_api_key`);
    console.log(`API key for ${provider} removed`);
  },

  // Test API key connectivity
  async testAPIKey(provider, apiKey) {
    try {
      // Use the existing AIServiceManager to test connectivity
      const { AIServiceManager } = await import('./aiServices');
      
      switch(provider) {
        case 'openai':
          await AIServiceManager.executeAITask('openai', 'generateContent', 'Test connectivity', apiKey);
          break;
        case 'perplexity':
          await AIServiceManager.executeAITask('perplexity', 'searchInsights', 'Test connectivity', apiKey);
          break;
        case 'claude':
          await AIServiceManager.executeAITask('claude', 'generateText', 'Test connectivity', apiKey);
          break;
        case 'jinaai':
          await AIServiceManager.executeAITask('jinaai', 'multimodalSearch', 'Test connectivity', apiKey);
          break;
        default:
          throw new APIKeyError(provider, 'Unsupported provider');
      }
      
      return true;
    } catch (error) {
      console.error(`API key test failed for ${provider}:`, error);
      return false;
    }
  }
};
