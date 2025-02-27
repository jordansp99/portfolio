import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, Slide, Container, Grid, Fade } from '@mui/material';
import PostCard from './Postcard.jsx';
import PostView from './PostView.jsx';
import { useNavigate } from 'react-router-dom';
import frontMatter from 'front-matter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Import all Markdown files using import.meta.glob
const postModules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Process the Markdown files and create the posts array
const posts = Object.entries(postModules).map(([path, content]) => {
  const slug = path.split('/').pop().replace('.md', '');
  const { attributes, body } = frontMatter(content);
  return {
    slug,
    ...attributes,
    content: body,
    image: attributes.image || null,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

// Transition for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AllPosts() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleBackToHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: { xs: 4, md: 6 },
          minHeight: '100vh',
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
              All Posts ({posts.length})
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleBackToHome}
              startIcon={<ArrowBackIcon />}
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
              Back to Home
            </Button>
          </Box>

          <Grid container spacing={4}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.slug}>
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

export default AllPosts;
