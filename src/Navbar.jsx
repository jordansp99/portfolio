import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar, Container } from '@mui/material';

function Navbar() {
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                color: 'primary.dark',
                letterSpacing: '-0.5px',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              Jordan's Portfolio
            </Typography>
          </RouterLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;