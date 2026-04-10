import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Stack, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const MealLogger = ({ onLogMeal }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [meal, setMeal] = useState({ name: '', calories: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMeal({ name: '', calories: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (meal.name && meal.calories) {
      onLogMeal({
        name: meal.name,
        calories: parseInt(meal.calories),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      handleClose();
    }
  };

  return (
    <>
      <Paper 
        onClick={handleOpen}
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: '12px', 
          border: `2px dashed ${theme.palette.divider}`, 
          textAlign: 'center', 
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.01)' : 'rgba(255,255,255,0.01)',
          '&:hover': { 
            bgcolor: 'rgba(255, 77, 77, 0.04)', 
            borderColor: '#FF4D4D',
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
          },
          mb: 4
        }}
      >
        <Stack alignItems="center" gap={1.5}>
          <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: 'rgba(255,77,77,0.1)', color: '#FF4D4D' }}>
            <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 0.5 }}>Quick Log Meal</Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="500">Track your calories effortlessly</Typography>
          </Box>
        </Stack>
      </Paper>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{ 
          sx: { 
            borderRadius: '20px', 
            p: 1,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          } 
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>🍎 Log New Meal</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter your meal details below to update your daily intake.
          </Typography>
          <Stack spacing={2.5}>
            <TextField 
              fullWidth 
              label="Meal Name" 
              placeholder="e.g. Greek Salad"
              value={meal.name}
              onChange={(e) => setMeal({ ...meal, name: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField 
              fullWidth 
              label="Calories" 
              placeholder="0"
              type="number"
              value={meal.calories}
              onChange={(e) => setMeal({ ...meal, calories: e.target.value })}
              InputProps={{ endAdornment: <InputAdornment position="end" sx={{ fontWeight: 700 }}>kcal</InputAdornment> }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose} sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'none' }}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained" 
            disableElevation
            sx={{ 
              px: 4, 
              borderRadius: '10px', 
              background: 'linear-gradient(135deg,#FF4D4D,#FF8C00)',
              fontWeight: 700,
              textTransform: 'none'
            }}
          >
            Add to Diary
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MealLogger;
