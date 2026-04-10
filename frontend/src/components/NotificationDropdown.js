import React, { useState } from 'react';
import { Box, IconButton, Badge, Menu, MenuItem, Typography, Stack, Divider, useTheme, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  
  const notifications = [
    { id: 1, type: 'water', title: 'Time to Hydrate!', msg: 'Drink a glass of water to stay energetic.', time: '10m ago', icon: <WaterDropIcon sx={{ color: '#2196f3' }} /> },
    { id: 2, type: 'workout', title: 'Workout Reminder', msg: 'Your Chest Session is scheduled for 5:30 PM.', time: '45m ago', icon: <FitnessCenterIcon sx={{ color: '#FF2625' }} /> },
    { id: 3, type: 'meal', title: 'Meal Log', msg: 'Don\'t forget to log your lunch!', time: '1h ago', icon: <RestaurantIcon sx={{ color: '#FF8C00' }} /> },
  ];

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} size="small" sx={{ p: '8px' }}>
        <Badge badgeContent={notifications.length} color="error" overlap="circular">
          <NotificationsIcon sx={{ color: theme.palette.text.secondary }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            border: `1px solid ${theme.palette.divider}`,
            p: 0
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="800">Notifications</Typography>
          <Typography variant="caption" sx={{ color: '#FF2625', fontWeight: 700, cursor: 'pointer' }}>Mark all as read</Typography>
        </Box>
        <Divider />
        <Stack sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {notifications.map((notif) => (
            <MenuItem key={notif.id} onClick={handleClose} sx={{ py: 1.5, px: 2, whiteSpace: 'normal', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.03)', width: 40, height: 40 }}>
                {notif.icon}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight="800">{notif.title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>{notif.msg}</Typography>
                <Typography variant="caption" color="primary" fontWeight="700">{notif.time}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Stack>
        <Divider />
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ cursor: 'pointer' }}>View All Notifications</Typography>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationDropdown;
