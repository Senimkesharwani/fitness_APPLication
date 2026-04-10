import React from 'react';
import { Box, Grid, Typography, Paper, Stack, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <SearchIcon sx={{ fontSize: 50, color: '#FF2625' }} />,
    title: 'Search Exercise',
    description: 'Browse our extensive database of 1000+ exercises with GIF demonstrations for every move.',
  },
  {
    icon: <SmartToyIcon sx={{ fontSize: 50, color: '#FF2625' }} />,
    title: 'Get AI Plan',
    description: 'Use our AI Recommendation engine to get personalized workout advice based on your fitness goals.',
  },
  {
    icon: <FitnessCenterIcon sx={{ fontSize: 50, color: '#FF2625' }} />,
    title: 'Start Training',
    description: 'Track your favorites and maintain your progress with a clean, easy-to-use fitness dashboard.',
  },
];

const HowItWorks = () => {
  const theme = useTheme();

  return (
    <Box id="how-it-works" sx={{ py: { lg: '120px', xs: '80px' }, width: '100%', scrollMarginTop: '100px' }}>
      <Typography 
        variant="h3" 
        sx={{ fontWeight: '800', textAlign: 'center', mb: '100px', fontSize: { lg: '48px', xs: '32px' }, color: theme.palette.text.primary }}
      >
        How It <span style={{ color: '#FF2625' }}>Works</span>
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {steps.map((step, idx) => (
          <Grid item xs={12} md={4} key={idx} sx={{ display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              style={{ display: 'flex', width: '100%' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  borderRadius: '30px',
                  textAlign: 'center',
                  background: theme.palette.background.paper,
                  border: theme.palette.mode === 'light' ? '1px solid rgba(0,0,0,0.05)' : `1px solid ${theme.palette.divider}`,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.palette.mode === 'light' ? '0 20px 40px rgba(0,0,0,0.05)' : '0 20px 40px rgba(0,0,0,0.5)',
                    borderColor: '#FF2625'
                  },
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '400px'
                }}
              >
                <Stack alignItems="center" gap={3}>
                  <Box 
                    sx={{ 
                        p: 3, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 38, 37, 0.05)' : 'rgba(255, 255, 255, 0.05)' 
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: '800', color: theme.palette.text.primary }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, lineHeight: '1.8' }}>
                    {step.description}
                  </Typography>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
