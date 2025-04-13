import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import Dashboard from './pages/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6B46C1',
      light: '#9F7AEA',
      dark: '#553C9A',
    },
    secondary: {
      main: '#38B2AC',
      light: '#4FD1C5',
      dark: '#2C7A7B',
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
    },
    success: {
      main: '#48BB78',
      light: '#68D391',
      dark: '#2F855A',
    },
    error: {
      main: '#E53E3E',
      light: '#FC8181',
      dark: '#C53030',
    },
    warning: {
      main: '#ED8936',
      light: '#F6AD55',
      dark: '#C05621',
    },
    info: {
      main: '#4299E1',
      light: '#63B3ED',
      dark: '#2B6CB0',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App; 