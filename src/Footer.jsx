import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub'; 

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='footer'>
    <LinkedInIcon sx={{ 
                color: '#21243D', 
              }}fontSize="large"></LinkedInIcon>
    <GitHubIcon               sx={{ 
                color: '#21243D', 
              }} fontSize="large"></GitHubIcon>
      <p>© {currentYear} All rights reserved</p>
    </footer>
  )
}

export default Footer