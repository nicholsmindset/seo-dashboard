import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { auth, database } from '../config/firebase';
import { ref, set, get } from 'firebase/database';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    notifications: true,
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: 'MM/DD/YYYY',
    dashboardLayout: 'default',
    emailNotifications: {
      webhookAlerts: true,
      contentUpdates: true,
      teamInvites: true,
      securityAlerts: true
    },
    theme: 'light'
  });

  useEffect(() => {
    if (currentUser?.uid) {
      // Load user data from Firebase
      const userRef = ref(database, `users/${currentUser.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser(userData);
          if (userData.preferences) {
            setPreferences(prev => ({
              ...prev,
              ...userData.preferences
            }));
          }
        } else {
          // Initialize new user
          const newUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            preferences
          };
          set(userRef, newUser);
          setUser(newUser);
        }
      });
    } else {
      setUser(null);
      setPreferences({
        notifications: true,
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: 'MM/DD/YYYY',
        dashboardLayout: 'default',
        emailNotifications: {
          webhookAlerts: true,
          contentUpdates: true,
          teamInvites: true,
          securityAlerts: true
        },
        theme: 'light'
      });
    }
  }, [currentUser]);

  const updateProfile = useCallback(async (updates) => {
    if (!currentUser?.uid) return;

    try {
      const userRef = ref(database, `users/${currentUser.uid}`);
      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await set(userRef, updatedUser);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  }, [currentUser?.uid, user]);

  const updatePreferences = useCallback(async (newPrefs) => {
    if (!currentUser?.uid) return;

    try {
      const updatedPreferences = { ...preferences, ...newPrefs };
      await set(ref(database, `users/${currentUser.uid}/preferences`), updatedPreferences);
      setPreferences(updatedPreferences);
      return { success: true };
    } catch (error) {
      console.error('Error updating preferences:', error);
      return { success: false, error: error.message };
    }
  }, [currentUser?.uid, preferences]);

  const value = {
    user,
    preferences,
    updateProfile,
    updatePreferences
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
