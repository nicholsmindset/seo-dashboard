import React, { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { useAuth } from './AuthContext';
import { database } from '../config/firebase';
import { ref, set, get } from 'firebase/database';

const APIKeyContext = createContext();

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'default-key';

export const useAPIKey = () => {
  const context = useContext(APIKeyContext);
  if (!context) {
    throw new Error('useAPIKey must be used within an APIKeyProvider');
  }
  return context;
};

export const APIKeyProvider = ({ children }) => {
  const [apiKeys, setAPIKeys] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.uid) {
      setAPIKeys({});
      return;
    }

    const loadKeys = async () => {
      try {
        const keysRef = ref(database, `apiKeys/${currentUser.uid}`);
        const snapshot = await get(keysRef);
        if (snapshot.exists()) {
          const encryptedKeys = snapshot.val();
          const decrypted = CryptoJS.AES.decrypt(encryptedKeys, ENCRYPTION_KEY);
          setAPIKeys(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
        } else {
          setAPIKeys({});
        }
      } catch (error) {
        console.error('Error loading API keys:', error);
        setAPIKeys({});
      }
    };

    loadKeys();
  }, [currentUser?.uid]);

  const setAPIKey = async (service, key) => {
    if (!currentUser?.uid) return;

    try {
      const newKeys = { ...apiKeys, [service]: key };
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(newKeys),
        ENCRYPTION_KEY
      ).toString();
      
      await set(ref(database, `apiKeys/${currentUser.uid}`), encrypted);
      setAPIKeys(newKeys);
      return { success: true };
    } catch (error) {
      console.error('Error setting API key:', error);
      return { success: false, error: error.message };
    }
  };

  const removeAPIKey = async (service) => {
    if (!currentUser?.uid) return;

    try {
      const newKeys = { ...apiKeys };
      delete newKeys[service];
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(newKeys),
        ENCRYPTION_KEY
      ).toString();
      
      await set(ref(database, `apiKeys/${currentUser.uid}`), encrypted);
      setAPIKeys(newKeys);
      return { success: true };
    } catch (error) {
      console.error('Error removing API key:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    apiKeys,
    setAPIKey,
    removeAPIKey
  };

  return (
    <APIKeyContext.Provider value={value}>
      {children}
    </APIKeyContext.Provider>
  );
};
