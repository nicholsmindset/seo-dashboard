import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { APIKeyValidators, APIKeyManager, APIKeyError } from '../utils/apiKeyValidation';
import { EncryptionService } from '../utils/encryption';
import { LoggerService } from '../utils/logging';

// Encryption passphrase storage key
const ENCRYPTION_PASSPHRASE_KEY = 'seo_dashboard_encryption_passphrase';

// Create the API Key Context
const APIKeyContext = createContext();

// Provider component
export const APIKeyProvider = ({ children }) => {
  // Initialize encryption passphrase
  const [encryptionPassphrase, setEncryptionPassphrase] = useState(() => {
    // Retrieve or generate encryption passphrase
    let passphrase = localStorage.getItem(ENCRYPTION_PASSPHRASE_KEY);
    
    if (!passphrase) {
      passphrase = EncryptionService.generatePassphrase();
      localStorage.setItem(ENCRYPTION_PASSPHRASE_KEY, passphrase);
    }
    
    return passphrase;
  });

  // Initialize API keys with decryption
  const [apiKeys, setApiKeys] = useState(() => {
    const providers = ['openai', 'perplexity', 'claude', 'jinaai'];
    const decryptedKeys = {};

    providers.forEach(provider => {
      const encryptedKey = localStorage.getItem(`${provider}_api_key_encrypted`);
      
      if (encryptedKey) {
        try {
          const decryptedKey = EncryptionService.decrypt(encryptedKey, encryptionPassphrase);
          decryptedKeys[provider] = decryptedKey || '';
        } catch (error) {
          LoggerService.error(`Failed to decrypt ${provider} API key`, { error });
          decryptedKeys[provider] = '';
        }
      } else {
        decryptedKeys[provider] = '';
      }
    });

    return decryptedKeys;
  });

  // Method to update a specific API key
  const updateAPIKey = useCallback(async (provider, key) => {
    try {
      // Validate key format
      if (!APIKeyValidators.validateKey(provider, key)) {
        throw new APIKeyError(provider, 'Invalid API key format');
      }

      // Test API key connectivity
      const isValid = await APIKeyManager.testAPIKey(provider, key);
      
      if (isValid) {
        // Encrypt and store the key
        const encryptedKey = EncryptionService.encrypt(key, encryptionPassphrase);
        localStorage.setItem(`${provider}_api_key_encrypted`, encryptedKey);
        
        // Update state
        setApiKeys((prev) => ({
          ...prev,
          [provider]: key,
        }));

        // Log successful key update
        LoggerService.info(`API key updated for ${provider}`, { 
          provider, 
          keyLength: key.length 
        });

        return true;
      } else {
        throw new APIKeyError(provider, 'API key connectivity test failed');
      }
    } catch (error) {
      // Log error
      LoggerService.error(`Failed to update ${provider} API key`, { 
        provider, 
        error: error.message 
      });

      return false;
    }
  }, [encryptionPassphrase]);

  // Method to remove a specific API key
  const removeAPIKey = useCallback((provider) => {
    try {
      // Remove encrypted key from localStorage
      localStorage.removeItem(`${provider}_api_key_encrypted`);
      
      // Update state
      setApiKeys((prev) => ({
        ...prev,
        [provider]: '',
      }));

      // Log key removal
      LoggerService.info(`API key removed for ${provider}`);
    } catch (error) {
      // Log error
      LoggerService.error(`Failed to remove ${provider} API key`, { 
        provider, 
        error: error.message 
      });
    }
  }, []);

  // Method to check if a specific API key exists
  const hasAPIKey = useCallback((provider) => {
    return !!apiKeys[provider];
  }, [apiKeys]);

  // Method to mask API keys for display
  const getMaskedAPIKey = useCallback((provider) => {
    const key = apiKeys[provider];
    return key ? APIKeyValidators.maskKey(key) : '';
  }, [apiKeys]);

  // Rotate encryption passphrase (advanced security feature)
  const rotateEncryptionPassphrase = useCallback(() => {
    try {
      // Generate new passphrase
      const newPassphrase = EncryptionService.generatePassphrase();
      
      // Re-encrypt all existing keys
      const providers = ['openai', 'perplexity', 'claude', 'jinaai'];
      providers.forEach(provider => {
        const key = apiKeys[provider];
        if (key) {
          // Decrypt with old passphrase, encrypt with new
          const encryptedKey = EncryptionService.encrypt(key, newPassphrase);
          localStorage.setItem(`${provider}_api_key_encrypted`, encryptedKey);
        }
      });

      // Update and store new passphrase
      setEncryptionPassphrase(newPassphrase);
      localStorage.setItem(ENCRYPTION_PASSPHRASE_KEY, newPassphrase);

      // Log passphrase rotation
      LoggerService.info('Encryption passphrase rotated');

      return true;
    } catch (error) {
      LoggerService.error('Failed to rotate encryption passphrase', { error });
      return false;
    }
  }, [apiKeys]);

  // Provide context value
  const contextValue = {
    apiKeys,
    updateAPIKey,
    removeAPIKey,
    hasAPIKey,
    getMaskedAPIKey,
    rotateEncryptionPassphrase,
  };

  return (
    <APIKeyContext.Provider value={contextValue}>
      {children}
    </APIKeyContext.Provider>
  );
};

// Custom hook to use the API Key Context
export const useAPIKeys = () => {
  const context = useContext(APIKeyContext);
  
  if (!context) {
    throw new Error('useAPIKeys must be used within an APIKeyProvider');
  }
  
  return context;
};

export default APIKeyContext;
