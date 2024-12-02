import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    screenReaderOptimized: false,
  });

  const applyAccessibilityChanges = useCallback(() => {
    // Apply high contrast
    if (accessibilitySettings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    // Apply large text
    if (accessibilitySettings.largeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }

    // Apply screen reader optimizations
    if (accessibilitySettings.screenReaderOptimized) {
      document.body.classList.add('screen-reader');
    } else {
      document.body.classList.remove('screen-reader');
    }
  }, [accessibilitySettings]);

  // Toggle functions
  const toggleHighContrast = useCallback(() => {
    setAccessibilitySettings(prev => ({
      ...prev,
      highContrast: !prev.highContrast
    }));
  }, []);

  const toggleLargeText = useCallback(() => {
    setAccessibilitySettings(prev => ({
      ...prev,
      largeText: !prev.largeText
    }));
  }, []);

  const toggleScreenReaderOptimized = useCallback(() => {
    setAccessibilitySettings(prev => ({
      ...prev,
      screenReaderOptimized: !prev.screenReaderOptimized
    }));
  }, []);

  // Apply changes whenever settings change
  useEffect(() => {
    applyAccessibilityChanges();
  }, [accessibilitySettings, applyAccessibilityChanges]);

  const value = {
    accessibilitySettings,
    toggleHighContrast,
    toggleLargeText,
    toggleScreenReaderOptimized
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
