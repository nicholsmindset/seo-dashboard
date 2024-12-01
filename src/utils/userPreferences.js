import { EncryptionService } from './encryption';
import { LoggerService } from './logging';
import { ErrorHandler } from './errorHandler';

// Encryption key for user preferences
const PREFERENCES_ENCRYPTION_KEY = 'seo_dashboard_user_prefs';

// Default user preferences
const DEFAULT_PREFERENCES = {
  theme: {
    mode: 'light',
    primaryColor: '#1976d2',
  },
  notifications: {
    email: true,
    inApp: true,
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    screenReaderMode: false,
  },
  dashboard: {
    defaultView: 'overview',
    widgetLayout: [],
  }
};

// User Preferences Management
export const UserPreferencesManager = {
  // Get user preferences
  getPreferences: () => {
    try {
      // Retrieve encrypted preferences
      const encryptedPrefs = localStorage.getItem(PREFERENCES_ENCRYPTION_KEY);
      
      if (!encryptedPrefs) {
        // Return default if no preferences exist
        UserPreferencesManager.resetPreferences();
        return DEFAULT_PREFERENCES;
      }

      // Decrypt preferences
      const decryptedPrefs = EncryptionService.decrypt(
        encryptedPrefs, 
        PREFERENCES_ENCRYPTION_KEY
      );

      // Merge with defaults to ensure all keys exist
      return { ...DEFAULT_PREFERENCES, ...decryptedPrefs };
    } catch (error) {
      ErrorHandler.handle(error, { 
        source: 'UserPreferencesManager.getPreferences',
        fallback: DEFAULT_PREFERENCES
      });
      return DEFAULT_PREFERENCES;
    }
  },

  // Save user preferences
  savePreferences: (newPreferences) => {
    try {
      // Merge with existing preferences
      const currentPrefs = UserPreferencesManager.getPreferences();
      const updatedPrefs = { ...currentPrefs, ...newPreferences };

      // Encrypt preferences
      const encryptedPrefs = EncryptionService.encrypt(
        updatedPrefs, 
        PREFERENCES_ENCRYPTION_KEY
      );

      // Store encrypted preferences
      localStorage.setItem(PREFERENCES_ENCRYPTION_KEY, encryptedPrefs);

      // Log preference update
      LoggerService.info('User preferences updated', { 
        updatedKeys: Object.keys(newPreferences) 
      });

      return updatedPrefs;
    } catch (error) {
      ErrorHandler.handle(error, { 
        source: 'UserPreferencesManager.savePreferences' 
      });
      return false;
    }
  },

  // Reset to default preferences
  resetPreferences: () => {
    try {
      // Encrypt and store default preferences
      const encryptedPrefs = EncryptionService.encrypt(
        DEFAULT_PREFERENCES, 
        PREFERENCES_ENCRYPTION_KEY
      );
      
      localStorage.setItem(PREFERENCES_ENCRYPTION_KEY, encryptedPrefs);

      // Log preference reset
      LoggerService.info('User preferences reset to default');

      return DEFAULT_PREFERENCES;
    } catch (error) {
      ErrorHandler.handle(error, { 
        source: 'UserPreferencesManager.resetPreferences' 
      });
      return DEFAULT_PREFERENCES;
    }
  },

  // Update specific preference section
  updatePreference: (section, updates) => {
    try {
      const currentPrefs = UserPreferencesManager.getPreferences();
      const updatedPrefs = {
        ...currentPrefs,
        [section]: { ...currentPrefs[section], ...updates }
      };

      return UserPreferencesManager.savePreferences(updatedPrefs);
    } catch (error) {
      ErrorHandler.handle(error, { 
        source: 'UserPreferencesManager.updatePreference',
        section,
        updates
      });
      return false;
    }
  },

  // Accessibility helpers
  getAccessibilityPreferences: () => {
    return UserPreferencesManager.getPreferences().accessibility;
  },

  // Theme helpers
  getThemePreferences: () => {
    return UserPreferencesManager.getPreferences().theme;
  }
};
