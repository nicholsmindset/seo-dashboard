import {
  getAuth,
  signInWithPopup,
  TwitterAuthProvider,
  FacebookAuthProvider,
  LinkedInAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { database } from '../config/firebase';

class AuthService {
  constructor() {
    this.auth = getAuth();
    this.providers = {
      google: new GoogleAuthProvider(),
      github: new GithubAuthProvider(),
      twitter: new TwitterAuthProvider(),
      facebook: new FacebookAuthProvider(),
      linkedin: new OAuthProvider('linkedin.com'),
      microsoft: new OAuthProvider('microsoft.com')
    };

    // Configure additional OAuth scopes
    this.providers.google.addScope('https://www.googleapis.com/auth/userinfo.profile');
    this.providers.github.addScope('read:user');
    this.providers.twitter.setCustomParameters({
      'lang': 'en'
    });
    this.providers.facebook.addScope('email');
    this.providers.linkedin.addScope('r_emailaddress');
    this.providers.linkedin.addScope('r_liteprofile');
    this.providers.microsoft.addScope('user.read');
  }

  async socialSignIn(providerName) {
    try {
      const provider = this.providers[providerName];
      if (!provider) {
        throw new Error(`Unsupported provider: ${providerName}`);
      }

      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;
      const isNewUser = result._tokenResponse.isNewUser;

      // Get additional user info
      let additionalUserInfo = {};
      switch (providerName) {
        case 'google':
          additionalUserInfo = {
            profilePicture: user.photoURL,
            email: user.email,
            name: user.displayName
          };
          break;
        case 'github':
          const githubToken = GithubAuthProvider.credentialFromResult(result).accessToken;
          const githubUserData = await this.fetchGithubUserData(githubToken);
          additionalUserInfo = {
            profilePicture: githubUserData.avatar_url,
            company: githubUserData.company,
            website: githubUserData.blog
          };
          break;
        case 'linkedin':
          const linkedinToken = result.credential.accessToken;
          const linkedinUserData = await this.fetchLinkedInUserData(linkedinToken);
          additionalUserInfo = {
            company: linkedinUserData.positions?.values?.[0]?.company?.name,
            industry: linkedinUserData.industry
          };
          break;
        // Add cases for other providers as needed
      }

      // Store user data
      await this.storeUserData(user.uid, {
        provider: providerName,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        ...additionalUserInfo,
        lastLogin: new Date().toISOString()
      });

      return {
        user,
        isNewUser,
        additionalUserInfo
      };
    } catch (error) {
      console.error('Social sign-in error:', error);
      throw this.handleAuthError(error);
    }
  }

  async fetchGithubUserData(token) {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`
      }
    });
    return response.json();
  }

  async fetchLinkedInUserData(token) {
    const response = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    return response.json();
  }

  async storeUserData(uid, userData) {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      // Update existing user data
      await set(userRef, {
        ...snapshot.val(),
        ...userData,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Create new user data
      await set(userRef, {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          emailNotifications: true,
          webhookAlerts: true,
          contentUpdates: true,
          seoAlerts: true,
          dailyReports: true
        }
      });
    }
  }

  async sendVerificationEmail(customTemplate = 'default') {
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/verify-email`,
        handleCodeInApp: true
      };
      await sendEmailVerification(this.auth.currentUser, actionCodeSettings);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw this.handleAuthError(error);
    }
  }

  async sendPasswordReset(email, customTemplate = 'default') {
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true
      };
      await sendPasswordResetEmail(this.auth, email, actionCodeSettings);
    } catch (error) {
      console.error('Error sending password reset:', error);
      throw this.handleAuthError(error);
    }
  }

  async updateUserProfile(updates) {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('No user is signed in');

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: updates.displayName,
        photoURL: updates.photoURL
      });

      // Update additional user data in database
      await this.storeUserData(user.uid, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw this.handleAuthError(error);
    }
  }

  handleAuthError(error) {
    let message = 'An error occurred during authentication.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Please sign in or reset your password.';
        break;
      case 'auth/invalid-email':
        message = 'The email address is invalid.';
        break;
      case 'auth/operation-not-allowed':
        message = 'This sign-in method is not enabled. Please contact support.';
        break;
      case 'auth/weak-password':
        message = 'The password is too weak. Please use a stronger password.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled. Please contact support.';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this email address.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again or reset your password.';
        break;
      case 'auth/popup-closed-by-user':
        message = 'The sign-in popup was closed before completion.';
        break;
      case 'auth/cancelled-popup-request':
        message = 'The sign-in process was cancelled.';
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'An account already exists with the same email but different sign-in credentials.';
        break;
    }

    return new Error(message);
  }
}

export default new AuthService();
