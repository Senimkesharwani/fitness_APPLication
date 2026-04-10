import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Stack, 
  Box, 
  IconButton, 
  useTheme, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Divider,
  Typography,
  Tooltip
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SettingsIcon from '@mui/icons-material/Settings';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { AuthContext } from '../context/AuthContext';
import { useColorMode } from '../context/ThemeContext';
import Logo from '../assets/images/Logo.png';
import NotificationDropdown from './NotificationDropdown';


const DashboardNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleClose();
        logout();
        navigate('/');
    };

    const handleMenuAction = (path) => {
        handleClose();
        navigate(path);
    };

    const handleNav = (path, scrollId) => {
        // Special case for Contact in Dashboard: 
        // It's on Home page (/), but Dashboard is on (/dashboard)
        if (location.pathname === path) {
            if (scrollId) {
                const element = document.getElementById(scrollId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
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
        { name: 'Search', path: '/exercises', scrollId: 'search-section', icon: <SearchIcon fontSize="small" /> },
        { name: 'Exercises', path: '/exercises', icon: <FitnessCenterIcon fontSize="small" /> },
        { name: 'Get Plan', path: '/dashboard', scrollId: 'ai-plan-generator', icon: <LightbulbIcon fontSize="small" /> },
        { name: 'Contact', path: '/contact', icon: <ContactSupportIcon fontSize="small" /> },
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
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(2, 6, 23, 0.7)',
                backdropFilter: 'blur(16px) saturate(180%)',
                borderBottom: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: theme.palette.mode === 'light' ? '0 4px 12px rgba(0,0,0,0.03)' : '0 4px 20px rgba(0,0,0,0.3)'
            }}
        >
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center"
                sx={{ 
                    py: '8px',
                    px: { xs: '15px', sm: '30px' },
                    maxWidth: '1440px', 
                    margin: '0 auto',
                    width: '100%'
                }}
            >
                {/* Left: Logo + Greeting */}
                <Stack direction="row" alignItems="center" gap={2}>
                    <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <img src={Logo} alt="logo" style={{ width: '38px', height: '38px' }} />
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: '800', display: { xs: 'none', md: 'block' }, letterSpacing: '-0.8px' }}>
                            ELITE <span style={{ color: '#FF4D4D' }}>FITNESS</span>
                        </Typography>
                    </Link>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', lg: 'block' } }} />
                    <Typography variant="body2" sx={{ fontWeight: '700', color: theme.palette.text.secondary, display: { xs: 'none', lg: 'block' } }}>
                        Hello, <span style={{ color: theme.palette.text.primary }}>{user?.name?.split(' ')[0] || 'Athlete'}</span> 👋
                    </Typography>
                </Stack>
                
                {/* Center: Main App Nav */}
                <Stack direction="row" gap={{ lg: '35px', md: '20px' }} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {navLinks.map((link) => (
                        <Box 
                            key={link.name}
                            onClick={() => handleNav(link.path, link.scrollId)} 
                            sx={{ 
                                cursor: 'pointer',
                                textDecoration: 'none', 
                                color: theme.palette.text.primary,
                                fontSize: '14px',
                                fontWeight: '600',
                                padding: '10px 16px',
                                borderRadius: '10px',
                                transition: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                '&:hover': { 
                                    background: theme.palette.mode === 'light' ? 'rgba(255, 77, 77, 0.08)' : 'rgba(255, 77, 77, 0.15)', 
                                    color: '#FF4D4D',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                        >
                            <Box sx={{ color: '#FF4D4D', display: 'flex' }}>{link.icon}</Box>
                            {link.name}
                        </Box>
                    ))}
                </Stack>

                {/* Right: Actions + Profile */}
                <Stack direction="row" alignItems="center" gap="10px">
                    <NotificationDropdown />
                    
                    <Tooltip title="Toggle Theme">
                        <IconButton onClick={toggleColorMode} color="inherit" size="small" sx={{ p: '8px' }}>
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Tooltip>


                    <Box sx={{ ml: 1 }}>
                        <IconButton onClick={handleClick} size="small" sx={{ 
                            p: '3px', 
                            border: `2px solid ${theme.palette.mode === 'light' ? 'rgba(255,77,77,0.1)' : 'rgba(255,77,77,0.2)'}`,
                            transition: 'all 0.3s ease',
                            '&:hover': { borderColor: '#FF4D4D' }
                        }}>
                            <Avatar sx={{ width: 34, height: 34, bgcolor: '#FF4D4D', fontWeight: '800', fontSize: '14px' }}>
                                {user?.name?.[0].toUpperCase()}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    borderRadius: '12px',
                                    minWidth: '200px',
                                    border: `1px solid ${theme.palette.divider}`,
                                    '& .MuiMenuItem-root': {
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        py: 1.2,
                                        borderRadius: '8px',
                                        mx: 1,
                                        my: 0.5,
                                    }
                                },
                            }}
                        >
                            <Box sx={{ px: 2, py: 1.5 }}>
                                <Typography variant="subtitle2" fontWeight="800">{user?.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <MenuItem onClick={() => handleMenuAction('/dashboard')}>
                                <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                                My Dashboard
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuAction('/plans')}>
                                <ListItemIcon><EventNoteIcon fontSize="small" /></ListItemIcon>
                                My Plans
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuAction('/saved')}>
                                <ListItemIcon><FavoriteIcon fontSize="small" /></ListItemIcon>
                                Saved Exercises
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuAction('/settings')}>
                                <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                                Settings
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout} sx={{ color: '#FF2625' }}>
                                <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#FF2625' }} /></ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
}

export default DashboardNavbar;
