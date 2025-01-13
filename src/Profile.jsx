import React from 'react';
import { Button, Avatar, Box } from '@mui/material';
import jordanPhoto from './assets/jordanimage.png'

function Profile() {
  return (
    <Box 
      component="section"
      className='promo'
      sx={{
        padding: '70px 20px 58px',
      }}
    >
      <Box 
        className='container'
        sx={{
          maxWidth: '860px',
          margin: '0 auto',
          display: 'flex',
          gap: '40px', // Added gap between flex items
        }}
      >
        <div className='promo_row' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className='promo_column' style={{flex: 1}}>
            <h1>Hi, I am Jordan,<br></br>Junior Data Scientist</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto praesentium maiores, delectus dolor impedit, minus perferendis dolore ab quaerat sequi vero iste dignissimos rem, eos non deleniti consequatur corrupti. Aspernatur.</p>
            <Button 
              size="large" 
              variant="contained" 
              color='primary'
              sx={{ color: 'white' }}
            >
              Download CV
            </Button>
          </div>
          <div className="promo_column" style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}> 
            <Avatar alt="photo of Jordan" src={jordanPhoto} sx={{ width: 300, height: 300 }} />
          </div>
        </div>
        </Box>
    </Box>
  );
}

export default Profile;