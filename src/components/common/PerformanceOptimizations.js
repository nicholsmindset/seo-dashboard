import React from 'react';

// HOC for memoizing components with custom comparison
export const withMemoization = (Component, propsAreEqual = null) => {
  return React.memo(Component, propsAreEqual);
};

// Custom hook for debounced values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for throttled values
export const useThrottle = (value, limit) => {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastRan = React.useRef(Date.now());

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

// Custom hook for detecting heavy operations
export const usePerformanceWarning = (operationName, threshold = 16) => {
  return React.useCallback((operation) => {
    const start = performance.now();
    const result = operation();
    const duration = performance.now() - start;

    if (duration > threshold) {
      console.warn(
        `Performance warning: ${operationName} took ${duration.toFixed(2)}ms, ` +
        `which is above the ${threshold}ms threshold`
      );
    }
    return result;
  }, [operationName, threshold]);
};

// Virtualization helper for large lists
export const VirtualizedList = React.memo(({ items, renderItem, itemHeight, windowHeight }) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(windowHeight / itemHeight),
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  
  const handleScroll = React.useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return (
    <div
      style={{ height: windowHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: startIndex * itemHeight }}>
          {visibleItems.map((item, index) => renderItem(item, startIndex + index))}
        </div>
      </div>
    </div>
  );
});

// Cache helper for expensive computations
export const createComputationCache = (computation) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, computation(...args));
      
      // Limit cache size to prevent memory leaks
      if (cache.size > 1000) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
    }
    return cache.get(key);
  };
};

// Performance monitoring component
export const PerformanceMonitor = React.memo(({ children }) => {
  React.useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {  // Log slow interactions
          console.warn(
            `Slow interaction detected: ${entry.name} took ${entry.duration}ms`
          );
        }
      }
    });

    observer.observe({ entryTypes: ['measure', 'longtask'] });
    return () => observer.disconnect();
  }, []);

  return children;
});
