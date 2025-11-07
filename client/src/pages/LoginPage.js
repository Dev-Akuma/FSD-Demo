import React from 'react';
import { createPkceChallenge, generateState, generateNonce } from '../pkceHelper';

// --- 1. Import MUI components ---
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub'; // <-- 1. Import GitHub Icon

const LoginPage = () => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:3000/auth/callback';

  // --- 2. Google Login Handler (Unchanged) ---
  const handleGoogleLogin = async () => {
    try {
      const { verifier, challenge } = await createPkceChallenge();
      const state = generateState();
      const nonce = generateNonce();

      localStorage.setItem('pkce_code_verifier', verifier);
      sessionStorage.setItem('oauth_state', state);
      sessionStorage.setItem('oauth_nonce', nonce);
      sessionStorage.setItem('oauth_provider', 'google'); // <-- Set provider

      const SCOPE = 'profile email';
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&response_type=code` +
        `&scope=${encodeURIComponent(SCOPE)}` +
        `&code_challenge=${challenge}` +
        `&code_challenge_method=S256` +
        `&state=${state}` +
        `&nonce=${nonce}` +
        `&access_type=offline` +
        `&prompt=consent`;
      window.location.href = authUrl;
    } catch (err) {
      console.error('Error during Google login', err);
    }
  };

  // --- 3. New GitHub Login Handler ---
  const handleGitHubLogin = async () => {
    try {
      const state = generateState();
      sessionStorage.setItem('oauth_state', state);
      sessionStorage.setItem('oauth_provider', 'github'); // <-- Set provider

      // GitHub's flow is simpler
      const SCOPE = 'read:user user:email';
      const authUrl = `https://github.com/login/oauth/authorize?` +
        `client_id=${GITHUB_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=${encodeURIComponent(SCOPE)}` +
        `&state=${state}`;
      
      window.location.href = authUrl;
    } catch (err) {
      console.error('Error during GitHub login', err);
    }
  };

  // --- 4. Update JSX with new button ---
  return (
    <Container component="main" maxWidth="xs" sx={{}}>
      <Paper elevation={3} sx={{}}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          OAuth2.0 Login
        </Typography>
        <Typography component="p" variant="body1">
          Sign in to continue
        </Typography>

        <Box sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Google Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{ padding: '10px', fontSize: '1rem' }}
          >
            Continue with Google
          </Button>

          {/* GitHub Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={handleGitHubLogin}
            sx={{ 
              padding: '10px', 
              fontSize: '1rem', 
              backgroundColor: '#333', // GitHub color
              '&:hover': {
                backgroundColor: '#555', // Darker hover
              }
            }}
          >
            Continue with GitHub
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;