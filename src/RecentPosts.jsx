import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import PostCard from './Postcard.jsx';
import frontMatter from 'front-matter'; // Make sure you have this installed: npm install front-matter

// Import all Markdown files using import.meta.glob
const postModules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true, // Important for Vite - loads modules at build time
});

// Process the Markdown files and create the posts array
const posts = Object.entries(postModules).map(([path, content]) => {
  const slug = path.split('/').pop().replace('.md', '');
  const { attributes, body } = frontMatter(content);
  return {
    slug,
    ...attributes,
    content: body, // If you need the Markdown content later
    image: attributes.image || null,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (newest first)


function RecentPosts() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          maxWidth: '860px',
          padding: '70px 20px 58px',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Recent posts
          </Typography>
          <Link underline="hover" color="secondary">
            View all
          </Link>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={2}>
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              date={post.date}
              category={post.category}
              description={post.description}
              image={post.image} // Pass the image to PostCard
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default RecentPosts;