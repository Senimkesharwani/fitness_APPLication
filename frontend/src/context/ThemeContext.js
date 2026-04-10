import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('elite_fitness_theme') || 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('elite_fitness_theme', newMode);
          return newMode;
        });
      },
    }),
    [],
  );


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#FF2625',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#f4f4f4',
          },
          background: {
            default: mode === 'light' ? '#FFFAFB' : '#020617', // Charcoal Black/Navy
            paper: mode === 'light' ? '#ffffff' : '#0F172A',   // Navy Blue for cards
          },
          text: {
            primary: mode === 'light' ? '#3A1212' : '#F8FAFC', // Near White
            secondary: mode === 'light' ? '#717171' : '#94A3B8', // Muted Slate
          },
          divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        },
        typography: {
          fontFamily: "'Josefin Sans', sans-serif",
          h1: { fontWeight: 800 },
          h2: { fontWeight: 800 },
          h3: { fontWeight: 800 },
          h4: { fontWeight: 700 },
          h5: { fontWeight: 700 },
          h6: { fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 700,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                transition: 'all 0.3s ease-in-out',
              },
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
