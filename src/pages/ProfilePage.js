import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { database } from '../config/firebase';
import NotificationService from '../services/notificationService';

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const notifications = new NotificationService(user?.uid);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    newPassword: '',
    currentPassword: '',
    company: '',
    role: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    webhookAlerts: true,
    contentUpdates: true,
    seoAlerts: true,
    dailyReports: true
  });

  useEffect(() => {
    const loadUserPreferences = async () => {
      if (user) {
        try {
          const prefsRef = ref(database, `users/${user.uid}/preferences`);
          const snapshot = await get(prefsRef);
          if (snapshot.exists()) {
            setPreferences(snapshot.val());
          }

          const profileRef = ref(database, `users/${user.uid}/profile`);
          const profileSnapshot = await get(profileRef);
          if (profileSnapshot.exists()) {
            const data = profileSnapshot.val();
            setProfileData(prev => ({
              ...prev,
              company: data.company || '',
              role: data.role || ''
            }));
          }
        } catch (error) {
          console.error('Error loading preferences:', error);
        }
      }
    };

    loadUserPreferences();
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Update display name
      if (profileData.displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: profileData.displayName
        });
      }

      // Update email if changed
      if (profileData.email !== user.email) {
        if (!profileData.currentPassword) {
          throw new Error('Current password is required to update email');
        }

        const credential = EmailAuthProvider.credential(
          user.email,
          profileData.currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, profileData.email);
      }

      // Update password if provided
      if (profileData.newPassword) {
        if (!profileData.currentPassword) {
          throw new Error('Current password is required to update password');
        }

        const credential = EmailAuthProvider.credential(
          user.email,
          profileData.currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, profileData.newPassword);
      }

      // Update additional profile data in Firebase
      await set(ref(database, `users/${user.uid}/profile`), {
        company: profileData.company,
        role: profileData.role,
        timezone: profileData.timezone
      });

      setSuccess('Profile updated successfully');
      await notifications.notifySystemEvent(
        'Profile Updated',
        'Your profile has been successfully updated'
      );
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await set(ref(database, `users/${user.uid}/preferences`), preferences);
      setSuccess('Preferences updated successfully');
      await notifications.notifySystemEvent(
        'Preferences Updated',
        'Your notification preferences have been updated'
      );
    } catch (error) {
      console.error('Preferences update error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile Settings
        </Typography>

        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <form onSubmit={handleProfileUpdate}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={user?.photoURL}
                          sx={{ width: 64, height: 64, mr: 2 }}
                        />
                        <Button variant="outlined">
                          Change Avatar
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Display Name"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          displayName: e.target.value
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company"
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          company: e.target.value
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Role"
                        value={profileData.role}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          role: e.target.value
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Change Password
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Current Password"
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          currentPassword: e.target.value
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        label="New Password"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          newPassword: e.target.value
                        }))}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton
                        loading={loading}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                      >
                        Update Profile
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Notification Preferences */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notification Preferences
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.emailNotifications}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          emailNotifications: e.target.checked
                        }))}
                      />
                    }
                    label="Email Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.webhookAlerts}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          webhookAlerts: e.target.checked
                        }))}
                      />
                    }
                    label="Webhook Alerts"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.contentUpdates}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          contentUpdates: e.target.checked
                        }))}
                      />
                    }
                    label="Content Updates"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.seoAlerts}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          seoAlerts: e.target.checked
                        }))}
                      />
                    }
                    label="SEO Alerts"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.dailyReports}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          dailyReports: e.target.checked
                        }))}
                      />
                    }
                    label="Daily Reports"
                  />
                </Box>
                <Button
                  variant="outlined"
                  onClick={handlePreferencesUpdate}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Snackbar
          open={!!success || !!error}
          autoHideDuration={6000}
          onClose={() => {
            setSuccess('');
            setError('');
          }}
        >
          <Alert
            severity={success ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {success || error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ProfilePage;
