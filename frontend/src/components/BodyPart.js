import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import Icon from '../assets/icons/gym.png';

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const theme = useTheme();

  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
          borderTop: bodyPart === item ? '4px solid #FF2625' : 'none',
          background: theme.palette.mode === 'light' ? '#fff' : 'rgba(15, 23, 42, 0.4)',
          borderBottomLeftRadius: '20px',
          width: '210px', // Reduced from 270px for a more compact row
          height: '230px', // Reduced from 282px
          cursor: 'pointer',
          gap: '20px', // Reduced from 47px
          transition: 'all 0.3s ease',
          boxShadow: theme.palette.mode === 'light' ? '0 5px 25px rgba(0,0,0,0.05)' : '0 5px 30px rgba(0,0,0,0.5)',
          '&:hover': {
              transform: 'scale(1.05) translateY(-5px)',
              boxShadow: theme.palette.mode === 'light' ? '0 15px 40px rgba(0,0,0,0.1)' : '0 15px 45px rgba(0,0,0,0.7)',
              background: theme.palette.mode === 'light' ? '#fff' : 'rgba(30, 41, 59, 0.6)',
          }
      }}
      onClick={() => {
        setBodyPart(item);
        // Dynamic scroll to results instead of hardcoded Top: 1800
        const exercisesSection = document.getElementById('exercises');
        if (exercisesSection) {
            exercisesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      <img src={Icon} alt="dumbbell" style={{ width: '40px', height: '40px' }} />
      <Typography 
          fontSize="20px" // Slightly reduced from 24px for smaller container
          fontWeight="bold" 
          color={theme.palette.text.primary} 
          textTransform="capitalize"
          sx={{ opacity: bodyPart === item ? 1 : 0.8 }}
      > 
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
