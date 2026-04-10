import React from 'react';
import { Box, Stack, Typography, Grid, Link, IconButton, useTheme, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Logo from '../assets/images/Logo.png';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box sx={{ 
            mt: '80px', 
            bgcolor: theme.palette.mode === 'light' ? '#121212' : '#020617',
            color: '#fff',
            pt: '80px',
            pb: '40px',
            px: { lg: '80px', xs: '20px' },
            borderTop: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none'
        }}>
            <Grid container spacing={5} mb="60px">
                <Grid item xs={12} md={5}>
                    <Stack spacing={3} sx={{ alignItems: { lg: 'flex-start', xs: 'center' }, textAlign: { lg: 'left', xs: 'center' } }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <img src={Logo} alt="logo" style={{ width: '40px', height: '40px' }} />
                            <Typography variant="h5" sx={{ fontWeight: '800', color: '#fff' }}>
                                ELITE <span style={{ color: '#FF2625' }}>FITNESS</span>
                            </Typography>
                        </Stack>
                        <Typography variant="body1" sx={{ opacity: 0.6, maxWidth: '400px', lineHeight: '1.8' }}>
                            Join the elite community and transform your life with our AI-driven workout plans. Your fitness journey starts here.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {[<FacebookIcon />, <InstagramIcon />, <TwitterIcon />].map((icon, idx) => (
                                <IconButton key={idx} sx={{ 
                                    color: '#fff', 
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    transition: '0.3s',
                                    '&:hover': { bgcolor: '#FF2625', transform: 'translateY(-5px)' }
                                }}>
                                    {icon}
                                </IconButton>
                            ))}
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Grid container spacing={4}>
                        {[
                            {
                                title: 'Quick Links',
                                links: [
                                    { name: 'Home', href: '/' },
                                    { name: 'How It Works', href: '/#how-it-works' },
                                    { name: 'Exercises', href: '/#exercises' },
                                    { name: 'Contact', href: '/#contact' },
                                ]
                            },
                            {
                                title: 'Resources',
                                links: [
                                    { name: 'Dashboard', href: '/dashboard' },
                                    { name: 'Login', href: '/login' },
                                    { name: 'Sign Up', href: '/signup' },
                                ]
                                
                            },
                            {
                                title: 'Company',
                                links: [
                                    { name: 'About Us', href: '/#about-us' },
                                    { name: 'Privacy Policy', href: '#' },
                                    { name: 'Terms of Service', href: '#' },
                                ]
                            }
                        ].map((section, idx) => (
                            <Grid item xs={6} sm={4} key={idx} sx={{ textAlign: { xs: 'left', sm: 'left' } }}>
                                <Typography variant="h6" sx={{ fontWeight: '700', mb: '25px', color: '#FF2625' }}>
                                    {section.title}
                                </Typography>
                                <Stack spacing={1.5}>
                                    {section.links.map((link, lIdx) => (
                                        <Link 
                                            key={lIdx} 
                                            href={link.href} 
                                            sx={{ 
                                                color: '#fff', 
                                                textDecoration: 'none', 
                                                opacity: 0.6,
                                                fontSize: '15px',
                                                transition: '0.3s',
                                                '&:hover': { opacity: 1, color: '#FF2625', pl: 0.5 }
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: '40px' }} />
            
            <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems="center" 
                gap={2}
            >
                <Typography variant="body2" sx={{ opacity: 0.4 }}>
                    © 2026 Elite Fitness. All Rights Reserved.
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.4 }}>
                    Crafted with ❤️ by Senim Kesharwani
                </Typography>
            </Stack>
        </Box>
    );
};

export default Footer;
