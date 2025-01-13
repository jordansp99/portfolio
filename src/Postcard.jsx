import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';

function PostCard({ title, date, category, description }) {
  return (
    <Card sx={{ flex: 1, backgroundColor:"background.default" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center"  mb={1}>
            <Typography variant="body2" color="text.secondary">{date}</Typography>
            <Typography variant="body2" color="text.secondary"> | </Typography>
            <Typography variant="body2" color="text.secondary">{category}</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;