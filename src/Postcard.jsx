import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import moment from 'moment'; // For date formatting (install: npm install moment)

function PostCard({ title, date, category, description }) {
  // 1. Format the date:
  const formattedDate = moment(date).format('MMMM DD, YYYY'); // Example format

  // OR, if you don't want to use moment:
  // const formattedDate = new Date(date).toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });


  return (
    <Card sx={{ flex: 1, backgroundColor: "background.default" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            {formattedDate} {/* Use the formatted date here */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            |
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;