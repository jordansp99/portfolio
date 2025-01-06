import React from 'react'
import {Button, Avatar}from '@mui/material';
function Profile() {
  return (
  <>
    <div className='profile-div'>
      <div className="left-content">
        <h1 className="dark">Hi, I am Jordan,<br></br>Junior Data Scientist</h1>
        <p className="dark">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto praesentium maiores, delectus dolor impedit, minus perferendis dolore ab quaerat sequi vero iste dignissimos rem, eos non deleniti consequatur corrupti. Aspernatur.</p>
       
        <Button size="large" variant="contained" 
        sx={{
          backgroundColor: '#C44536',
          color: 'white',}}>Download CV
          </Button>

      </div>
      <div class="right-content">
      <Avatar alt="photo of Jordan" src="/src/assets/image.png"sx={{ width: 300, height: 300 }} />
      </div>
    </div>

  </>
  )
}

export default Profile