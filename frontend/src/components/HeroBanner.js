import React from 'react';
import { Box, Typography, Button, Stack, useTheme, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => {
    const theme = useTheme();

    const badges = [
        { icon: <AutoAwesomeIcon />, label: 'AI Powered' },
        { icon: <FitnessCenterIcon />, label: 'Beginner Friendly' },
        { icon: <SelfImprovementIcon />, label: 'Pro Workouts' },
    ];

    const stats = [
        { label: 'Exercises', value: '500+' },
        { label: 'Users', value: '10K+' },
    ];

    return (
        <Box 
            sx={{ 
                mt: { lg: '10px', xs: '5px' },
                position: 'relative',
                width: '100%',
                minHeight: { lg: '70vh', xs: 'auto' },
                pb: { lg: '60px', xs: '30px' },
                display: 'flex',
                alignItems: 'center',
                background: theme.palette.mode === 'light' 
                    ? 'radial-gradient(circle at 80% 20%, rgba(255, 38, 37, 0.05) 0%, transparent 50%)'
                    : 'radial-gradient(circle at 80% 20%, rgba(255, 38, 37, 0.1) 0%, transparent 50%)',
            }}
        >
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={7}>
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Stack direction="row" spacing={2} mb="15px" flexWrap="wrap" gap="10px">
                            {badges.map((badge, idx) => (
                                <Box 
                                    key={idx}
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '8px',
                                        background: theme.palette.mode === 'light' ? 'rgba(255, 38, 37, 0.1)' : 'rgba(15, 23, 42, 0.5)',
                                        px: 2, py: 0.8,
                                        borderRadius: '20px',
                                        color: '#FF2625',
                                        border: `1px solid ${theme.palette.mode === 'light' ? 'transparent' : 'rgba(255, 38, 37, 0.2)'}`
                                    }}
                                >
                                    {badge.icon}
                                    <Typography fontSize="11px" fontWeight="700" sx={{ textTransform: 'uppercase' }}>
                                        {badge.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                        
                        <Typography variant="h2" sx={{ fontSize: { lg: '74px', md: '56px', xs: '38px' }, fontWeight: '800', lineHeight: '1.1', mb: '15px', color: theme.palette.text.primary }}>
                            Sweat, Smile <br />
                            And <span style={{ color: '#FF2625' }}>Repeat</span>
                        </Typography>

                        <Typography sx={{ fontSize: '18px', opacity: 0.8, mb: '30px', maxWidth: '580px', lineHeight: '1.6', color: theme.palette.text.secondary }}>
                            Experience the future of fitness with AI-powered workout plans and your personal health assistant. Join the elite community and transform your life today.
                        </Typography>

                        <Stack direction="row" spacing={4} alignItems="center" flexWrap="wrap" gap="20px">
                            <Button 
                                variant="contained" 
                                href="#exercises" 
                                sx={{ 
                                    bgcolor: '#FF2625', 
                                    color: '#fff', 
                                    px: '35px', 
                                    py: '14px', 
                                    fontSize: '16px',
                                    borderRadius: '10px',
                                    boxShadow: '0 10px 20px rgba(255, 38, 37, 0.2)',
                                    '&:hover': { bgcolor: '#e02221' }
                                }}
                            >
                                Get Started
                            </Button>
                            
                            <Stack direction="row" spacing={4}>
                                {stats.map((stat, idx) => (
                                    <Box key={idx}>
                                        <Typography sx={{ fontWeight: '900', fontSize: '28px', color: theme.palette.text.primary, lineHeight: 1 }}>{stat.value}</Typography>
                                        <Typography sx={{ fontSize: '12px', color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '1px', mt: 0.5 }}>{stat.label}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{ width: '100%', maxWidth: '530px', position: 'relative' }} 
                    >
                        <motion.div
                           animate={{ y: [0, -10, 0] }}
                           transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Box
                                component="img"
                                src={HeroBannerImage}
                                alt="hero-banner"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: { lg: '680px', md: '520px', xs: '480px' }, // Tighter height to prevent cutting with cover
                                    objectFit: 'cover', // Changed back to cover to remove left/right whitespace
                                    objectPosition: 'top center', // Focus on the subject's head
                                    borderRadius: '30px',
                                    zIndex: 5,
                                    boxShadow: theme.palette.mode === 'light' ? '0 15px 40px rgba(0,0,0,0.08)' : '0 15px 40px rgba(0,0,0,0.4)',
                                    display: 'block',
                                    mx: 'auto'
                                }}
                            />
                        </motion.div>
                        
                        {/* Soft Glow */}
                        <Box 
                            sx={{ 
                                position: 'absolute', 
                                width: '100%', 
                                height: '100%', 
                                bgcolor: '#FF2625', 
                                filter: 'blur(80px)', 
                                opacity: theme.palette.mode === 'light' ? 0.05 : 0.1, 
                                top: '10%', 
                                left: 0,
                                zIndex: 1,
                                borderRadius: '50%'
                            }} 
                        />
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HeroBanner;
