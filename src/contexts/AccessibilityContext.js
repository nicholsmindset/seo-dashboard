import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserPreferencesManager } from '../utils/userPreferences';
import { ErrorHandler } from '../utils/errorHandler';

// Create Accessibility Context
export const AccessibilityContext = createContext({
  fontSize: 'medium',
  highContrast: false,
  screenReaderMode: false,
  updateAccessibility: () => {},
});

// Accessibility Provider Component
export const AccessibilityProvider = ({ children }) => {
  // Initialize state from user preferences
  const [accessibilitySettings, setAccessibilitySettings] = useState(() => {
    try {
      return UserPreferencesManager.getAccessibilityPreferences();
    } catch (error) {
      ErrorHandler.handle(error, { 
        source: 'AccessibilityProvider.initialization' 
      });
      return {
        fontSize: 'medium',
        highContrast: false,
        screenReaderMode: false,
      };
    }
  });

  // Update accessibility settings
  const updateAccessibility = (updates) => {
    try {
      // Update local state
      setAccessibilitySettings(prev => ({
        ...prev,
        ...updates
      }));

      // Persist to user preferences
      UserPreferencesManager.updatePreference('accessibility', updates);

      // Apply accessibility changes
      applyAccessibilityChanges(updates);
    } catch (error) {
      ErrorHandler.handle(error, { 
        source: 'AccessibilityProvider.updateAccessibility',
        updates 
      });
    }
  };

  // Apply accessibility changes
  const applyAccessibilityChanges = (changes) => {
    // Adjust font size
    if (changes.fontSize) {
      document.documentElement.style.fontSize = getFontSizeValue(changes.fontSize);
    }

    // Toggle high contrast mode
    if (changes.highContrast !== undefined) {
      document.body.classList.toggle('high-contrast', changes.highContrast);
    }

    // Screen reader mode
    if (changes.screenReaderMode !== undefined) {
      document.body.setAttribute('data-screen-reader', changes.screenReaderMode.toString());
    }
  };

  // Helper to convert font size setting to actual pixel value
  const getFontSizeValue = (size) => {
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    };
    return fontSizes[size] || '16px';
  };

  // Apply initial accessibility settings
  useEffect(() => {
    applyAccessibilityChanges(accessibilitySettings);
  }, []);

  // Context value
  const contextValue = {
    ...accessibilitySettings,
    updateAccessibility,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Custom hook for accessibility context
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  
  return context;
};
