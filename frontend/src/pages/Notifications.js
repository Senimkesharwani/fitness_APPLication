import React from 'react';
import { Box, Typography, Container, Stack, Paper, useTheme, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion } from 'framer-motion';

const Notifications = () => {
    const theme = useTheme();

    return (
        <Box sx={{ mt: { lg: '60px', xs: '30px' }, pb: '100px' }}>
            <Container maxWidth="md">
                <Stack direction="row" alignItems="center" gap={2} mb={6}>
                    <NotificationsIcon sx={{ color: '#FF2625', fontSize: '40px' }} />
                    <Box>
                        <Typography variant="h3" fontWeight="900" letterSpacing="-1px">
                            Elite <span style={{ color: '#FF2625' }}>Alerts</span>
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight="500">
                            Stay sharp, stay informed.
                        </Typography>
                    </Box>
                </Stack>

                <Paper elevation={0} sx={{ p: 10, textAlign: 'center', borderRadius: '32px', border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' }}>
                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                        <Avatar sx={{ width: 100, height: 100, bgcolor: 'rgba(255,38,37,0.1)', color: '#FF2625', margin: '0 auto', mb: 3 }}>
                            <NotificationsIcon sx={{ fontSize: '50px' }} />
                        </Avatar>
                    </motion.div>
                    <Typography variant="h5" fontWeight="900" mb={1}>No New Alerts</Typography>
                    <Typography color="text.secondary" maxWidth="500px" margin="0 auto">
                        You are all caught up! We will notify you here when there are updates to your plans or new elite features.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Notifications;
