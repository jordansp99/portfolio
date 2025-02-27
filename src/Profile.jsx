import React from 'react';
import { Button, Avatar, Box, Container, Typography } from '@mui/material';
import jordanPhoto from './assets/jordanimage.png'

function Profile() {
  return (
    <Box 
      component="section"
      sx={{
        padding: { xs: '40px 0', md: '70px 0 58px' },
        backgroundColor: 'background.default',
        px: { xs: 3, md: 5 }
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 2, md: 4 }
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: '30px', md: '40px' },
          }}
        >
          <Box 
            sx={{ 
              flex: 1,
              order: { xs: 2, md: 1 },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.dark',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 2
              }}
            >
              Hi, I am Jordan,<br />Junior Data Scientist
            </Typography>
            
            <Typography 
              variant="body1" 
              paragraph
              sx={{ 
                color: 'text.secondary',
                mb: 3,
                maxWidth: '600px',
                mx: { xs: 'auto', md: 0 }
              }}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto praesentium maiores, delectus dolor impedit, minus perferendis dolore ab quaerat sequi vero iste dignissimos rem, eos non deleniti consequatur corrupti. Aspernatur.
            </Typography>
            
            <Button 
              size="large" 
              variant="contained" 
              color='primary'
              sx={{ 
                color: 'white',
                borderRadius: '4px',
                px: 4,
                py: 1,
                fontSize: '1rem'
              }}
            >
              Download Resume
            </Button>
          </Box>
          
          <Box 
            sx={{ 
              flex: { xs: 'none', md: '0 0 300px' },
              order: { xs: 1, md: 2 },
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Avatar
              src={jordanPhoto}
              alt="Jordan"
              sx={{
                width: { xs: 200, md: 250 },
                height: { xs: 200, md: 250 },
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Profile;