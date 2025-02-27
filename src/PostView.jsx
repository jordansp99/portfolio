import React, { useState } from 'react';
import { Box, Typography, IconButton, Container, Chip, Divider, Tooltip, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom code renderer for ReactMarkdown
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  
  const handleCopy = (e) => {
    // Prevent event propagation
    e.preventDefault();
    e.stopPropagation();
    
    // Get only the code content without any formatting
    const code = String(children).replace(/\n$/, '');
    
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    return false;
  };
  
  if (inline) {
    return (
      <code 
        className={className} 
        {...props}
        style={{ 
          backgroundColor: '#2d2d2d', 
          padding: '2px 4px', 
          borderRadius: '3px',
          color: '#e6e6e6',
          fontFamily: 'monospace'
        }}
      >
        {children}
      </code>
    );
  }
  
  return (
    <Box 
      component="div" 
      sx={{ 
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        my: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0,
        right: 0,
        zIndex: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        p: 0.5,
        bgcolor: 'rgba(0,0,0,0.7)'
      }}>
        {language && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'white',
              px: 2,
              py: 0.5,
              fontFamily: 'monospace',
              fontSize: '0.75rem'
            }}
          >
            {language}
          </Typography>
        )}
        <Tooltip title="Copy code" placement="left">
          <IconButton 
            size="small" 
            onClick={handleCopy}
            sx={{ 
              color: 'white',
              '&:hover': { 
                bgcolor: 'rgba(255,255,255,0.1)' 
              },
              width: 30,
              height: 30,
              minWidth: 30
            }}
          >
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      {copied && (
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: 8,
            right: 8,
            zIndex: 3,
            borderRadius: 1,
            bgcolor: 'success.light',
            color: 'white',
            px: 2,
            py: 0.5,
            fontSize: '0.75rem',
            fontWeight: 'medium',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          Copied!
        </Box>
      )}
      <SyntaxHighlighter
        language={language || 'text'}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: '16px',
          paddingTop: '40px',
          borderRadius: '8px',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          backgroundColor: '#2d2d2d'
        }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </Box>
  );
};

function PostView({ post, onClose }) {
  // Format the date
  const formattedDate = moment(post.date).format('MMMM DD, YYYY');
  
  // Handle multiple categories if they're comma-separated
  const categories = post.category ? post.category.split(',').map(cat => cat.trim()) : [];

  return (
    <Box 
      sx={{ 
        bgcolor: 'white', 
        minHeight: '100vh',
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: 'auto',
        zIndex: 1300
      }}
    >
      <Box 
        sx={{ 
          position: 'sticky', 
          top: 0, 
          bgcolor: 'white', 
          zIndex: 10,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          py: 1.5,
          px: { xs: 2, md: 3 }
        }}
      >
        <Container 
          maxWidth="lg"
          sx={{
            px: { xs: 2, md: 4 }
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton 
              onClick={onClose}
              aria-label="back"
              sx={{ 
                color: 'primary.dark',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton 
              onClick={onClose} 
              aria-label="close"
              sx={{ 
                color: 'primary.dark',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
      
      <Container 
        maxWidth="md" 
        sx={{ 
          py: 6,
          px: { xs: 3, md: 5 }
        }}
      >
        <Box 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 2,
            bgcolor: 'white',
            mb: 4
          }}
        >
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              color: 'primary.dark',
              mb: 3,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }
            }}
          >
            {post.title}
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            {categories.map((cat, index) => (
              <Chip 
                key={index} 
                label={cat} 
                size="small" 
                sx={{ 
                  bgcolor: 'primary.light', 
                  color: 'white',
                  fontWeight: 500
                }} 
              />
            ))}
          </Box>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Published on {formattedDate}
          </Typography>

          {post.image && (
            <Box mb={4}>
              <img 
                src={post.image} 
                alt={post.title} 
                style={{ 
                  width: '100%', 
                  borderRadius: '8px',
                  maxHeight: '500px',
                  objectFit: 'cover'
                }} 
              />
            </Box>
          )}
          
          <Divider sx={{ mb: 4 }} />
          
          <Box 
            className="markdown-content"
            sx={{
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '4px',
                my: 2
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                color: 'primary.dark',
                fontWeight: 'bold',
                mt: 4,
                mb: 2
              },
              '& p': {
                mb: 2,
                lineHeight: 1.7
              },
              '& ul, & ol': {
                pl: 4,
                mb: 2
              },
              '& blockquote': {
                borderLeft: '4px solid',
                borderColor: 'primary.light',
                pl: 2,
                py: 1,
                my: 2,
                bgcolor: 'white',
                borderRadius: '4px'
              },
              '& code': {
                fontFamily: 'monospace',
                bgcolor: '#2d2d2d',
                color: '#e6e6e6',
                p: 0.5,
                borderRadius: '4px',
                fontSize: '0.9em'
              }
            }}
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock
              }}
            >
              {post.content}
            </ReactMarkdown>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PostView;
