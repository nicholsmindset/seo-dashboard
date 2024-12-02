import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, applyActionCode, sendEmailVerification } from 'firebase/auth';
import NotificationService from '../services/notificationService';

const EmailVerification = () => {
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const notifications = new NotificationService(auth?.currentUser?.uid);

  useEffect(() => {
    const verifyEmail = async () => {
      const oobCode = new URLSearchParams(location.search).get('oobCode');
      
      if (oobCode) {
        try {
          await applyActionCode(auth, oobCode);
          setSuccess(true);
          setVerifying(false);
          
          if (auth.currentUser) {
            await notifications.notifySystemEvent(
              'Email Verified',
              'Your email has been successfully verified!'
            );
          }
        } catch (error) {
          console.error('Email verification error:', error);
          setError(error.message);
          setVerifying(false);
        }
      } else {
        setError('No verification code provided');
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [auth, location.search, notifications]);

  const handleResendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setSuccess(true);
        setError('');
      } catch (error) {
        console.error('Error sending verification email:', error);
        setError(error.message);
      }
    } else {
      setError('Please sign in to resend verification email');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Email Verification
          </Typography>

          {verifying ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : success ? (
            <>
              <Alert severity="success" sx={{ mb: 3 }}>
                Your email has been successfully verified!
              </Alert>
              <Button
                variant="contained"
                onClick={() => navigate('/dashboard')}
                sx={{ mt: 2 }}
              >
                Go to Dashboard
              </Button>
            </>
          ) : (
            <>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              <Typography variant="body1" sx={{ mb: 3 }}>
                {error
                  ? "We couldn't verify your email. Please try again or request a new verification link."
                  : "Please verify your email address to continue."}
              </Typography>
              <Button
                variant="contained"
                onClick={handleResendVerification}
                sx={{ mr: 2 }}
              >
                Resend Verification Email
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{ mt: { xs: 2, sm: 0 } }}
              >
                Back to Login
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default EmailVerification;
