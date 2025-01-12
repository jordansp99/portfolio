import React from 'react';
import { Button, Avatar } from '@mui/material';
import jordanImage from '/assets/jordanImage.png'

import './profile.css'; // Import the CSS file

function Profile() {
  return (
    <section className='promo'>
      <div className='container'>
        <div className='promo_row'>
          <div className='promo_column'>
            <h1>Hi, I am Jordan,<br></br>Junior Data Scientist</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto praesentium maiores, delectus dolor impedit, minus perferendis dolore ab quaerat sequi vero iste dignissimos rem, eos non deleniti consequatur corrupti. Aspernatur.</p>
            <Button 
              size="large" 
              variant="contained" 
              sx={{ 
                backgroundColor: '#C44536', 
                color: 'white', 
              }}
            >
              Download CV
            </Button>
          </div>
          <div className="promo_column"> 
            <Avatar alt="photo of Jordan" src={jordanImage} sx={{ width: 300, height: 300 }} />
          </div>
        </div>
        </div>
    </section>
  );
}

export default Profile;