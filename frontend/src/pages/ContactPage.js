import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

const ContactPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.mode === 'light' 
        ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' 
        : 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
      py: { xs: 4, md: 8 },
      px: { xs: 2, md: 4 }
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: '900', 
                mb: 2,
                fontSize: { xs: '3rem', md: '4rem' },
                background: 'linear-gradient(135deg, #FF2625 0%, #FF8C00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px'
              }}
            >
              Contact Support
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                margin: '0 auto',
                fontWeight: '500'
              }}
            >
              We're here to help you on your fitness journey. Fill out the form below and we'll get back to you shortly.
            </Typography>
          </Box>
        </motion.div>

        <Contact />
      </Container>
    </Box>
  );
};

export default ContactPage;
