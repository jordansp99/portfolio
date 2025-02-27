import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, CardActionArea } from '@mui/material';
import moment from 'moment';

function PostCard({ title, date, category, description, image }) {
  // Format the date
  const formattedDate = moment(date).format('MMMM DD, YYYY');
  
  // Handle multiple categories if they're comma-separated
  const categories = category ? category.split(',').map(cat => cat.trim()) : [];
  
  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.3s ease',
        bgcolor: 'white',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
        }
      }}
    >
      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        {image && (
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt={title}
              sx={{ 
                objectFit: 'cover',
              }}
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%)'
              }} 
            />
          </Box>
        )}
        
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box mb={1.5} display="flex" flexWrap="wrap" gap={0.75}>
            {categories.map((cat, index) => (
              <Chip 
                key={index} 
                label={cat} 
                size="small" 
                sx={{ 
                  bgcolor: 'primary.light', 
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '0.7rem'
                }} 
              />
            ))}
          </Box>
          
          <Typography 
            variant="h5" 
            component="div" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.dark',
              mb: 1,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              fontSize: '0.8rem'
            }}
          >
            {formattedDate}
          </Typography>
          
          {description && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.6
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostCard;