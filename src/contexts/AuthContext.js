import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import authService from '../services/authService';
import emailService from '../services/emailService';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      await sendEmailVerification(user);
      
      // Send welcome email
      await emailService.sendEmail('welcome', {
        email,
        name: displayName,
      });

      return user;
    } catch (error) {
      setError(authService.handleAuthError(error).message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      setError(authService.handleAuthError(error).message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(authService.handleAuthError(error).message);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(authService.handleAuthError(error).message);
      throw error;
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      await authService.updateUserProfile(updates);
    } catch (error) {
      setError(authService.handleAuthError(error).message);
      throw error;
    }
  };

  const socialLogin = async (provider) => {
    try {
      const result = await authService.socialSignIn(provider);
      return result;
    } catch (error) {
      setError(authService.handleAuthError(error).message);
      throw error;
    }
  };

  const verifyEmail = async () => {
    try {
      if (!currentUser) throw new Error('No user is signed in');
      await sendEmailVerification(currentUser);
    } catch (error) {
      setError(authService.handleAuthError(error).message);
      throw error;
    }
  };

  const value = {
    currentUser,
    error,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    socialLogin,
    verifyEmail,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
