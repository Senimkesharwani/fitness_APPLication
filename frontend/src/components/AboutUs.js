import React from 'react';
import { Box, Typography, Stack, Grid, useTheme, Paper } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PublicIcon from '@mui/icons-material/Public';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { motion } from 'framer-motion';

const features = [
  { icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: '#FF2625' }} />, title: 'AI Personalized', desc: 'Custom workout plans powered by advanced AI and your personal data.' },
  { icon: <PublicIcon sx={{ fontSize: 40, color: '#FF2625' }} />, title: 'Global Community', desc: 'Join thousands of elite athletes across the globe on their journey.' },
  { icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#FF2625' }} />, title: 'Trusted Results', desc: 'Proven transformation routines with verified scientific background.' }
]

const AboutUs = () => {
  const theme = useTheme();

  return (
    <Box id="about-us" sx={{ py: { lg: '60px', xs: '40px' }, width: '100%', overflow: 'hidden', scrollMarginTop: '100px' }}>
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={12} md={6}>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Typography color="#FF2625" sx={{ fontWeight: '700', fontSize: '20px', letterSpacing: '4px', textTransform: 'uppercase', mb: 2 }}>
                    Our Vision
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: '800', lineHeight: 1.2, mb: 4, color: theme.palette.text.primary }}>
                    Empowering Your <span style={{ color: '#FF2625' }}>Elite</span> Fitness Transformation
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: '18px', lineHeight: 1.8, mb: 5 }}>
                    Founded with a passion for excellence, Elite Fitness was built to bridge the gap between AI technology and high-performance training. We provide elite-level guidance to anyone, anywhere, ensuring that your fitness journey is not just effective, but truly transformative.
                </Typography>
            </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
            <Stack spacing={3}>
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                    >
                        <Paper 
                            sx={{ 
                                p: 4, 
                                borderRadius: '20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 3,
                                background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255, 255, 255, 0.03)',
                                border: `1px solid ${theme.palette.divider}`,
                                transform: 'translateY(0)',
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-5px)', borderColor: '#FF2625' }
                            }}
                        >
                            <Box sx={{ bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 38, 37, 0.05)' : 'rgba(255, 255, 255, 0.05)', p: 2, borderRadius: '50%' }}>
                                {feature.icon}
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight="800" sx={{ mb: 1, color: theme.palette.text.primary }}>{feature.title}</Typography>
                                <Typography sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>{feature.desc}</Typography>
                            </Box>
                        </Paper>
                    </motion.div>
                ))}
            </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
