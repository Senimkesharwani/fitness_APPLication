import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Stack, Grid, IconButton, LinearProgress, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

const DailyTracker = ({ dailyStats, updateStats }) => {
  const theme = useTheme();

  const handleWaterChange = (delta) => {
    updateStats('water', Math.max(0, (dailyStats.water || 0) + delta));
  };

  const handleStepsChange = (delta) => {
    updateStats('steps', Math.max(0, (dailyStats.steps || 0) + delta));
  };

  const toggleWorkout = () => {
    updateStats('workoutDone', !dailyStats.workoutDone);
  };

  const waterGoal = 8; // 8 glasses
  const stepsGoal = 10000;
  const calGoal = dailyStats.calGoal || 2000;

  return (
    <Grid container spacing={3} mb={4}>
      {/* Calories */}
      <Grid item xs={12} sm={6} lg={3}>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Paper elevation={0} sx={{ 
            p: 3, 
            borderRadius: '12px', 
            border: `1px solid ${theme.palette.divider}`, 
            height: '100%',
            boxShadow: 'var(--shadow-soft)',
            background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.02)'
          }}>
            <Stack direction="row" alignItems="center" gap={1.5} mb={2.5}>
              <Box sx={{ p: 1, borderRadius: '10px', bgcolor: 'rgba(255, 77, 77, 0.1)', color: '#FF4D4D', display: 'flex' }}>
                <LocalFireDepartmentIcon />
              </Box>
              <Typography variant="h6" fontWeight="700">Calories</Typography>
            </Stack>
            <Box mb={2}>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5 }}>{dailyStats.calories || 0}</Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="600">of {calGoal} kcal goal</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(((dailyStats.calories || 0) / calGoal) * 100, 100)} 
              sx={{ 
                height: 8, borderRadius: 4, bgcolor: 'rgba(0,0,0,0.05)',
                '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #FF4D4D, #FF8C00)', borderRadius: 4 }
              }} 
            />
          </Paper>
        </motion.div>
      </Grid>

      {/* Water Intake */}
      <Grid item xs={12} sm={6} lg={3}>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Paper elevation={0} sx={{ 
            p: 3, 
            borderRadius: '12px', 
            border: `1px solid ${theme.palette.divider}`, 
            height: '100%',
            boxShadow: 'var(--shadow-soft)',
            background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.02)'
          }}>
            <Stack direction="row" alignItems="center" gap={1.5} mb={2.5}>
              <Box sx={{ p: 1, borderRadius: '10px', bgcolor: 'rgba(33, 150, 243, 0.1)', color: '#2196f3', display: 'flex' }}>
                <WaterDropIcon />
              </Box>
              <Typography variant="h6" fontWeight="700">Water</Typography>
            </Stack>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" mb={2}>
              <Box>
                <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5 }}>{dailyStats.water || 0}</Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="600">Glasses of {waterGoal}</Typography>
              </Box>
              <Stack direction="row" gap={1} mb={0.5}>
                <IconButton onClick={() => handleWaterChange(-1)} size="small" sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleWaterChange(1)} size="small" sx={{ bgcolor: '#2196f3', color: '#fff', '&:hover': { bgcolor: '#1976d2' }, borderRadius: '8px' }}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(((dailyStats.water || 0) / waterGoal) * 100, 100)} 
              sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(0,0,0,0.05)', '& .MuiLinearProgress-bar': { bgcolor: '#2196f3' } }} 
            />
          </Paper>
        </motion.div>
      </Grid>

      {/* Steps */}
      <Grid item xs={12} sm={6} lg={3}>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Paper elevation={0} sx={{ 
            p: 3, 
            borderRadius: '12px', 
            border: `1px solid ${theme.palette.divider}`, 
            height: '100%',
            boxShadow: 'var(--shadow-soft)',
            background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.02)'
          }}>
            <Stack direction="row" alignItems="center" gap={1.5} mb={2.5}>
              <Box sx={{ p: 1, borderRadius: '10px', bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50', display: 'flex' }}>
                <DirectionsWalkIcon />
              </Box>
              <Typography variant="h6" fontWeight="700">Steps</Typography>
            </Stack>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" mb={2}>
              <Box>
                <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5 }}>{dailyStats.steps || 0}</Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="600">of {stepsGoal} goal</Typography>
              </Box>
              <Stack direction="row" gap={1} mb={0.5}>
                <IconButton onClick={() => handleStepsChange(-500)} size="small" sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleStepsChange(500)} size="small" sx={{ bgcolor: '#4CAF50', color: '#fff', '&:hover': { bgcolor: '#388e3c' }, borderRadius: '8px' }}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(((dailyStats.steps || 0) / stepsGoal) * 100, 100)} 
              sx={{ height: 8, borderRadius: 4, bgcolor: 'rgba(0,0,0,0.05)', '& .MuiLinearProgress-bar': { bgcolor: '#4CAF50' } }} 
            />
          </Paper>
        </motion.div>
      </Grid>

      {/* Workout Done */}
      <Grid item xs={12} sm={6} lg={3}>
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Paper 
            onClick={toggleWorkout}
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: '12px', 
              border: dailyStats.workoutDone ? '1px solid #4CAF50' : `1px solid ${theme.palette.divider}`, 
              height: '100%', 
              cursor: 'pointer', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: dailyStats.workoutDone ? '0 8px 20px rgba(76,175,80,0.15)' : 'var(--shadow-soft)',
              background: dailyStats.workoutDone ? 'rgba(76, 175, 80, 0.02)' : theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Stack direction="row" alignItems="center" gap={1.5} mb={2.5}>
              <Box sx={{ 
                p: 1, 
                borderRadius: '10px', 
                bgcolor: dailyStats.workoutDone ? '#4CAF50' : 'rgba(0,0,0,0.05)', 
                color: dailyStats.workoutDone ? '#fff' : 'text.secondary', 
                display: 'flex',
                transition: 'all 0.3s ease'
              }}>
                <CheckCircleIcon />
              </Box>
              <Typography variant="h6" fontWeight="700">Workout</Typography>
            </Stack>
            <Box mb={1}>
              <Typography variant="h4" fontWeight="800" color={dailyStats.workoutDone ? '#4CAF50' : 'text.secondary'} sx={{ mb: 0.5 }}>
                {dailyStats.workoutDone ? 'Session Done!' : 'Pending'}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500">
                {dailyStats.workoutDone ? 'Great job today! 🚀' : 'Ready to start? 💪'}
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default DailyTracker;
