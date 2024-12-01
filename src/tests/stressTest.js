import { mockContentData, mockKeywordData, mockTeamData } from '../utils/testUtils';

// Stress test functions
const runStressTests = async () => {
  console.group('Running Stress Tests');
  
  // Test data loading
  console.log('Testing data loading with large datasets...');
  try {
    console.time('Content Data Load');
    const contentData = mockContentData;
    console.timeEnd('Content Data Load');
    console.log(`Loaded ${contentData.length} content items`);
    
    console.time('Keyword Data Load');
    const keywordData = mockKeywordData;
    console.timeEnd('Keyword Data Load');
    console.log(`Loaded ${keywordData.length} keywords`);
    
    console.time('Team Data Load');
    const teamData = mockTeamData;
    console.timeEnd('Team Data Load');
    console.log(`Loaded ${teamData.length} team members`);
  } catch (error) {
    console.error('Data loading test failed:', error);
  }

  // Test filtering and sorting
  console.log('\nTesting filtering and sorting operations...');
  try {
    console.time('Content Filtering');
    const filteredContent = mockContentData.filter(item => 
      item.status === 'Published' && item.views > 5000
    );
    console.timeEnd('Content Filtering');
    console.log(`Filtered ${filteredContent.length} content items`);

    console.time('Keyword Sorting');
    const sortedKeywords = [...mockKeywordData].sort((a, b) => b.volume - a.volume);
    console.timeEnd('Keyword Sorting');
    console.log('Sorted keywords by volume');
  } catch (error) {
    console.error('Filtering and sorting test failed:', error);
  }

  // Test search operations
  console.log('\nTesting search operations...');
  try {
    console.time('Content Search');
    const searchResults = mockContentData.filter(item =>
      item.title.toLowerCase().includes('test') ||
      item.keywords.some(kw => kw.toLowerCase().includes('test'))
    );
    console.timeEnd('Content Search');
    console.log(`Found ${searchResults.length} matching items`);
  } catch (error) {
    console.error('Search test failed:', error);
  }

  // Test memory usage
  console.log('\nTesting memory usage...');
  try {
    if (window.performance && window.performance.memory) {
      const memory = window.performance.memory;
      console.table({
        'Used JS Heap': `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
        'Total JS Heap': `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
        'JS Heap Limit': `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`
      });
    }
  } catch (error) {
    console.error('Memory usage test failed:', error);
  }

  // Test concurrent operations
  console.log('\nTesting concurrent operations...');
  try {
    console.time('Concurrent Operations');
    await Promise.all([
      // Simulate multiple concurrent data operations
      Promise.resolve(mockContentData.map(item => ({ ...item, processed: true }))),
      Promise.resolve(mockKeywordData.filter(kw => kw.volume > 1000)),
      Promise.resolve(mockTeamData.sort((a, b) => b.performance - a.performance))
    ]);
    console.timeEnd('Concurrent Operations');
  } catch (error) {
    console.error('Concurrent operations test failed:', error);
  }

  console.groupEnd();
};

export const runAllTests = () => {
  console.log('Starting comprehensive tests...');
  runStressTests().then(() => {
    console.log('All tests completed');
  }).catch(error => {
    console.error('Test suite failed:', error);
  });
};
