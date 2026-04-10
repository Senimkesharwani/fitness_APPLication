import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Stack, 
  Button, 
  Box, 
  IconButton, 
  useTheme, 
  Typography
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import Logo from '../assets/images/Logo.png';
import { useContext } from 'react';

const LandingNavbar = () => {
    const { token } = useContext(AuthContext);
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const isLinkActive = (item) => {
        return location.pathname === item.path && (!item.scrollId || location.hash === `#${item.scrollId}`);
    };

    const handleNav = (path, scrollId) => {
        // If we're already on the path, just scroll
        if (location.pathname === path) {
            if (scrollId) {
                const element = document.getElementById(scrollId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // If element doesn't exist on this page, but we are on the path, 
                    // it might be a different page that shares the same root path but different content
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            // Navigate first, then scroll
            navigate(path);
            if (scrollId) {
                // Give it a bit more time for the page to render
                setTimeout(() => {
                    const element = document.getElementById(scrollId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
        }
    };

    const navLinks = [
        { name: 'Home', path: '/', scrollId: null },
        { name: 'How It Works', path: '/', scrollId: 'how-it-works' },
        { name: 'Search', path: '/search', scrollId: null },
        { name: 'Exercises', path: '/exercises', scrollId: 'exercises' },
        { name: 'About Us', path: '/', scrollId: 'about-us' },
        { name: 'Contact', path: '/', scrollId: 'contact' },
    ];

    return (
        <Box 
            sx={{ 
                position: 'fixed',
                top: 0, 
                left: 0,
                right: 0,
                zIndex: 1100, 
                width: '100%',
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(2, 6, 23, 0.85)',
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease-in-out',
                boxShadow: theme.palette.mode === 'light' ? '0 2px 12px rgba(0,0,0,0.05)' : '0 2px 20px rgba(0,0,0,0.3)'
            }}
        >
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center"
                sx={{ 
                    py: '12px',
                    px: { xs: '20px', sm: '40px' },
                    maxWidth: '1400px', 
                    margin: '0 auto',
                    width: '100%'
                }}
            >
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <img src={Logo} alt="logo" style={{ width: '40px', height: '40px' }} />
                    <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: '800', display: { xs: 'none', sm: 'block' } }}>
                        ELITE <span style={{ color: '#FF2625' }}>FITNESS</span>
                    </Typography>
                </Link>
                
                <Stack direction="row" gap={{ lg: '40px', md: '25px', sm: '15px' }} alignItems="center">
                    <Stack direction="row" gap={{ lg: '30px', md: '20px', sm: '10px' }} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navLinks.map((link) => (
                            <Box 
                                key={link.name}
                                onClick={() => {
                                    if (link.name === 'Exercises' && !token) {
                                        handleNav('/', 'exercises');
                                    } else {
                                        handleNav(link.path, link.scrollId);
                                    }
                                }} 
                                sx={{ 
                                    cursor: 'pointer',
                                    textDecoration: 'none', 
                                    color: theme.palette.text.primary,
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    position: 'relative',
                                    padding: '5px 0',
                                    transition: '0.3s',
                                    '&:hover .nav-underline': { width: '100%' }
                                }}
                            >
                                {link.name}
                                <Box 
                                    className="nav-underline" 
                                    sx={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        left: 0, 
                                        width: isLinkActive(link) ? '100%' : '0%', 
                                        height: '2px', 
                                        bgcolor: '#FF2625',
                                        transition: 'width 0.3s'
                                    }} 
                                />
                            </Box>
                        ))}
                    </Stack>

                    <Stack direction="row" alignItems="center" gap="10px">
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>

                        <Button 
                            variant="text"
                            onClick={() => navigate('/login')}
                            sx={{ 
                                color: theme.palette.text.primary,
                                fontWeight: '700',
                                textTransform: 'none',
                                '&:hover': { color: '#FF2625' }
                            }}
                        >
                            Login
                        </Button>

                        <Button 
                            variant="contained"
                            onClick={() => navigate('/signup')}
                            sx={{ 
                                bgcolor: '#FF2625', 
                                borderRadius: '10px',
                                px: '25px',
                                fontWeight: '700',
                                textTransform: 'none',
                                '&:hover': { bgcolor: '#e02221' }
                            }}
                        >
                            Register
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default LandingNavbar;
