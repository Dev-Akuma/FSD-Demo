import React from 'react';
import { createTheme } from '@mui/material/styles';
import { SvgIcon } from '@mui/material';

// 1. Create your custom "Nimbus" theme
export const nimbusTheme = createTheme({
  palette: {
    mode: 'dark', // Go for a dark theme
    primary: {
      main: '#90CAF9', // A light blue, good for dark backgrounds
    },
    secondary: {
      main: '#f48fb1', // A pink accent
    },
    background: {
      default: '#121212', // Standard dark background
      paper: '#1e1e1e',   // Paper components will be slightly lighter
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Softer corners
          textTransform: 'none', // More modern button text
          fontWeight: 600,
          padding: '10px 20px',
        },
        containedPrimary: {
          color: '#000',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // Match paper color
        },
      },
    },
  },
});

// 2. Create a simple SVG Logo Component
export const NimbusLogo = (props) => (
  <SvgIcon {...props} viewBox="0 0 100 80">
    {/* A simple "cloud + lock" logo */}
    <path 
      d="M60.1,13.6C58,5.9,50.7,0,41.7,0C29.2,0,19.1,10.2,19.1,22.7c0,2.1,0.3,4.1,0.8,6C9.1,30.3,0,40.1,0,52.1
      C0,66.3,11.3,77.5,25.5,77.5h43.3c15.6,0,28.2-12.6,28.2-28.2C97,35.4,85.1,23.5,71.2,22.8c1.3-2.9,2.1-6,2.1-9.3
      C73.3,13.6,60.1,13.6,60.1,13.6z" 
      fill="#90CAF9" // Use primary theme color
    />
    {/* Lock Body */}
    <path 
      d="M65,45h-20c-2.8,0-5,2.2-5,5v15c0,2.8,2.2,5,5,5h20c2.8,0,5-2.2,5-5v-15C70,47.2,67.8,45,65,45z" 
      fill="#121212" // Use background color
    />
    {/* Lock Shackle */}
    <path 
      d="M55,35c-5.5,0-10,4.5-10,10h5c0-2.8,2.2-5,5-5s5,2.2,5,5h5C65,39.5,60.5,35,55,35z" 
      fill="#121212"
    />
  </SvgIcon>
);