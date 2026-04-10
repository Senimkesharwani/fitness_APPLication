import React from 'react';
import { Box, Paper, Typography, Stack, Grid, Tooltip, useTheme } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import VerifiedIcon from '@mui/icons-material/Verified';

const Achievements = ({ stats }) => {
  const theme = useTheme();

  const badges = [
    { title: '7-Day Streak', icon: <WhatshotIcon />, color: '#FF8C00', earned: (stats.streak >= 7), desc: 'Incredible! 7 days of consistency.' },
    { title: 'First Workout', icon: <EmojiEventsIcon />, color: '#FF2625', earned: (stats.workoutsDone > 0), desc: 'The journey of a thousand miles starts with one rep.' },
    { title: 'Goal Crusher', icon: <VerifiedIcon />, color: '#4caf50', earned: (stats.goalReachedCount >= 5), desc: 'Reached daily calorie goal 5 times.' },
    { title: 'Water Champion', icon: <LocalActivityIcon />, color: '#2196f3', earned: true, desc: 'Stayed hydrated for 3 consecutive days.' },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
      <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
        <EmojiEventsIcon sx={{ color: '#FCC757' }} />
        <Typography variant="h6" fontWeight="800">Elite Achievements</Typography>
      </Stack>

      <Grid container spacing={2}>
        {badges.map((badge, idx) => (
          <Grid item xs={6} sm={3} key={idx}>
            <Tooltip title={badge.earned ? badge.desc : 'Keep going to unlock!'} arrow>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2, borderRadius: '16px', textAlign: 'center', transition: 'all 0.3s ease',
                  bgcolor: badge.earned ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.01)',
                  filter: badge.earned ? 'none' : 'grayscale(1)',
                  opacity: badge.earned ? 1 : 0.4,
                  border: badge.earned ? `1px solid ${badge.color}50` : `1px solid ${theme.palette.divider}`
                }}
              >
                <Box sx={{ color: badge.color, fontSize: 32, mb: 1, display: 'flex', justifyContent: 'center' }}>
                  {badge.icon}
                </Box>
                <Typography variant="caption" fontWeight="800" sx={{ display: 'block', height: '14px', overflow: 'hidden' }}>{badge.title}</Typography>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Achievements;
