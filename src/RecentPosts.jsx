import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, Slide, Container, Grid, Fade } from '@mui/material';
import PostCard from './Postcard.jsx';
import PostView from './PostView.jsx';
import frontMatter from 'front-matter';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

// Transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RecentPosts() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  
  // Get the most recent two posts for the homepage
  const recentPosts = posts.slice(0, 2);
  
  // Get total number of posts
  const totalPosts = posts.length;
  
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleViewAllPosts = () => {
    navigate('/all-posts', { replace: true });
  };

  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: { xs: 4, md: 6 },
          mt: { xs: 0, md: 0 },
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
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={4}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              pb: 2
            }}
          >
            <Typography 
              variant="h4" 
              fontWeight="bold"
              sx={{ 
                color: 'primary.dark',
                fontSize: { xs: '1.75rem', md: '2.25rem' }
              }}
            >
              Recent Posts
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleViewAllPosts}
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                borderRadius: '24px',
                px: { xs: 2, md: 3 },
                py: { xs: 0.5, md: 1 },
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                },
                transition: 'all 0.3s ease'
              }}
            >
              View All ({totalPosts})
            </Button>
          </Box>

          <Grid container spacing={4}>
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <Grid item xs={12} sm={6} key={post.slug}>
                  <Box 
                    sx={{ 
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}
                    onClick={() => handlePostClick(post)}
                  >
                    <PostCard
                      title={post.title}
                      date={post.date}
                      category={post.category}
                      description={post.description}
                      image={post.image}
                    />
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center" 
                  sx={{ height: '200px' }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No posts found
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
        
        {/* Full-screen Post Dialog */}
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleCloseDialog}
          TransitionComponent={Transition}
        >
          {selectedPost && (
            <PostView post={selectedPost} onClose={handleCloseDialog} />
          )}
        </Dialog>
      </Box>
    </Fade>
  );
}

export default RecentPosts;