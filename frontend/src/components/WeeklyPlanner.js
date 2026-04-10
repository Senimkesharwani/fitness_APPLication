import React from 'react';
import { Box, Paper, Typography, Stack, useTheme, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';

const WeeklyPlanner = ({ schedule, activeDay, onDayClick }) => {
  const theme = useTheme();

  const days = [
    { name: 'Mon', focus: 'Chest' },
    { name: 'Tue', focus: 'Back' },
    { name: 'Wed', focus: 'Rest' },
    { name: 'Thu', focus: 'Legs' },
    { name: 'Fri', focus: 'Shoulders' },
    { name: 'Sat', focus: 'Arms' },
    { name: 'Sun', focus: 'Cardio' },
  ];

  const currentSchedule = schedule || days;

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <EventIcon sx={{ color: '#FF2625' }} />
          <Typography variant="h6" fontWeight="800">Weekly Planner</Typography>
        </Stack>
        <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
      </Stack>

      <Stack direction="row" gap={2} sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.05)', borderRadius: '3px' } }}>
        {currentSchedule.map((day, idx) => (
          <Box key={idx} sx={{ minWidth: 100, textAlign: 'center' }}>
            <Paper 
              elevation={0}
              onClick={() => onDayClick && onDayClick(idx)}
              sx={{ 
                p: 2, borderRadius: '16px', border: activeDay === idx ? '2px solid #FF2625' : `1px solid ${theme.palette.divider}`,
                bgcolor: activeDay === idx ? 'rgba(255, 38, 37, 0.05)' : 'transparent',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: activeDay === idx ? 'rgba(255, 38, 37, 0.08)' : 'rgba(0,0,0,0.02)',
                  borderColor: activeDay === idx ? '#FF2625' : 'text.secondary'
                }
              }}
            >
              <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{day.day || day.name}</Typography>
              <Typography variant="body1" fontWeight="900" sx={{ mt: 0.5, mb: 1, whiteSpace: 'nowrap' }}>{day.focus}</Typography>
              <Chip 
                label={day.focus === 'Rest' ? 'Rest' : 'Workout'} 
                size="small" 
                sx={{ 
                  height: '20px', fontSize: '10px', fontWeight: 800,
                  bgcolor: day.focus === 'Rest' ? 'rgba(0,0,0,0.05)' : 'rgba(76, 175, 80, 0.1)',
                  color: day.focus === 'Rest' ? 'text.secondary' : '#4caf50'
                }} 
              />
            </Paper>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default WeeklyPlanner;
