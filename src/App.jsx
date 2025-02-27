import React from 'react';
import Profile from "./Profile";
import Footer from "./Footer";
import RecentPosts from "./RecentPosts";
import AllPosts from "./AllPosts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6464;',
      dark: '#21243D',
      light: '#8695A4'
    },
    secondary: {
      main: '#00A8CC', // A bright pink-red
    },
    background: {
      default: 'white', // A light grey for background
      paper: '#EDF7FA', // White for cards and dialogs
    },
  },
  typography: {

    fontFamily: 'Heebo, sans-serif', // Example font
  },
});

// Home page component
function HomePage() {
  return (
    <>
      <Profile />
      <RecentPosts />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-posts" element={<AllPosts />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;