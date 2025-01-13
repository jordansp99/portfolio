import React from 'react';
import { Box, Typography,  Link } from '@mui/material';
import PostCard from './Postcard.jsx';

function RecentPosts() {
  const posts = [
    {
      id: 1,
      title: 'Making a design system from scratch',
      date: '12 Feb 2020',
      category: 'Design, Pattern',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
    {
      id: 2,
      title: 'Creating pixel perfect icons in Figma',
      date: '12 Feb 2020',
      category: 'Figma, Icon Design',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
  ];

  return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'background.paper', // Example
          }}
        >
        <Box sx={{
        maxWidth: '860px', // Set the maximum width of the box
        padding:'70px 20px 58px',
      }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
                Recent posts
            </Typography>
           <Link underline="hover" color="secondary">View all</Link>
        </Box>

            {/* Post Cards Container */}
            <Box display="flex" gap={2}>
            {posts.map((post) => (
                <PostCard
                key={post.id}
                title={post.title}
                date={post.date}
                category={post.category}
                description={post.description}
                />
                ))}
            </Box>
      </Box>
    </Box>
  );
}

export default RecentPosts;