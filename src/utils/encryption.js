import CryptoJS from 'crypto-js';

// Generate a secure encryption key from a user-provided passphrase
const generateEncryptionKey = (passphrase) => {
  // Use PBKDF2 for key derivation
  return CryptoJS.PBKDF2(passphrase, 'seo-dashboard-salt', {
    keySize: 256 / 32,
    iterations: 1000
  });
};

// Encryption utility for sensitive data
export const EncryptionService = {
  // Encrypt data with a passphrase
  encrypt: (data, passphrase) => {
    try {
      if (!data) return '';
      
      const key = generateEncryptionKey(passphrase);
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      return encrypted.toString();
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  },

  // Decrypt data with a passphrase
  decrypt: (encryptedData, passphrase) => {
    try {
      if (!encryptedData) return null;
      
      const key = generateEncryptionKey(passphrase);
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  },

  // Generate a secure random encryption passphrase
  generatePassphrase: () => {
    const length = 32;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let passphrase = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      passphrase += charset[randomIndex];
    }
    
    return passphrase;
  },

  // Securely store encrypted data
  secureStore: (key, data, passphrase) => {
    try {
      const encryptedData = EncryptionService.encrypt(data, passphrase);
      
      // Store encrypted data in localStorage
      localStorage.setItem(key, encryptedData);
      
      return true;
    } catch (error) {
      console.error('Secure storage error:', error);
      return false;
    }
  },

  // Retrieve and decrypt stored data
  secureRetrieve: (key, passphrase) => {
    try {
      const encryptedData = localStorage.getItem(key);
      
      if (!encryptedData) return null;
      
      return EncryptionService.decrypt(encryptedData, passphrase);
    } catch (error) {
      console.error('Secure retrieval error:', error);
      return null;
    }
  },

  // Clear sensitive data
  secureClear: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Secure clear error:', error);
      return false;
    }
  }
};
