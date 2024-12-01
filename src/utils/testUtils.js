// Test utilities for stress testing components
export const mockContentData = Array(1000).fill(null).map((_, index) => ({
  id: index,
  title: `Test Content ${index}`,
  status: ['Draft', 'In Progress', 'Review', 'Published'][Math.floor(Math.random() * 4)],
  author: `Author ${Math.floor(Math.random() * 10)}`,
  dateCreated: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  dateModified: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
  keywords: Array(Math.floor(Math.random() * 5) + 1)
    .fill(null)
    .map(() => `keyword${Math.floor(Math.random() * 100)}`),
  views: Math.floor(Math.random() * 10000),
  engagement: Math.floor(Math.random() * 100),
}));

export const mockKeywordData = Array(1000).fill(null).map((_, index) => ({
  id: index,
  keyword: `test-keyword-${index}`,
  volume: Math.floor(Math.random() * 10000),
  difficulty: Math.floor(Math.random() * 100),
  position: Math.floor(Math.random() * 100),
  traffic: Math.floor(Math.random() * 5000),
  lastUpdated: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
}));

export const mockTeamData = Array(100).fill(null).map((_, index) => ({
  id: index,
  name: `Team Member ${index}`,
  role: ['Writer', 'Editor', 'SEO Specialist', 'Manager'][Math.floor(Math.random() * 4)],
  contentCount: Math.floor(Math.random() * 100),
  performance: Math.floor(Math.random() * 100),
  lastActive: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
}));

// Error simulation for stress testing
export const simulateNetworkError = (probability = 0.1) => {
  if (Math.random() < probability) {
    throw new Error('Network Error: Failed to fetch data');
  }
};

export const simulateTimeout = async (probability = 0.1) => {
  if (Math.random() < probability) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    throw new Error('Timeout Error: Request took too long');
  }
};

// Performance monitoring
export const measurePerformance = (func) => {
  return async (...args) => {
    const start = performance.now();
    try {
      const result = await func(...args);
      const end = performance.now();
      console.log(`Performance: ${func.name} took ${end - start}ms`);
      return result;
    } catch (error) {
      console.error(`Error in ${func.name}:`, error);
      throw error;
    }
  };
};

// Memory usage monitoring
export const checkMemoryUsage = () => {
  if (window.performance && window.performance.memory) {
    const memory = window.performance.memory;
    console.log('Memory Usage:', {
      usedJSHeapSize: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
      totalJSHeapSize: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
      jsHeapSizeLimit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`,
    });
  }
};
