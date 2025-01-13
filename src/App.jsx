import React from 'react';
import Profile from "./Profile";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RecentPosts from "./RecentPosts";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
      paper: '#ffffff', // White for cards and dialogs
    },
  },
  typography: {

    fontFamily: 'Heebo, sans-serif', // Example font
  },
});


function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar></Navbar>
      <Profile></Profile>
      <RecentPosts></RecentPosts>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default App;