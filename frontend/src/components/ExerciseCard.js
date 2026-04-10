import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Box, IconButton, useTheme, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ExerciseCard = ({ exercise }) => {
  const { token } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const checkFav = async () => {
        if (!token) return;
        try {
            const res = await axios.get('http://localhost:5000/api/favorites', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsFav(res.data.data.some(f => f._id === exercise._id || f.id === exercise.id));
        } catch (e) {}
    }
    checkFav();
  }, [token, exercise._id, exercise.id]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    if (!token) return alert('Please login to save favorites');
    try {
        await axios.post('http://localhost:5000/api/favorites', 
            { exerciseId: exercise._id },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFav(!isFav);
    } catch (err) {
        console.error('Failed to toggle favorite');
    }
  };

  return (
    <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: '100%', maxWidth: '360px' }} // Slightly reduced max-width
    >
        <Paper
            elevation={0}
            component={Link}
            to={`/exercise/${exercise.id}`}
            sx={{ 
                textDecoration: 'none', 
                backgroundColor: theme.palette.background.paper,
                borderRadius: '20px', // Slightly smaller radius for compact feel
                overflow: 'hidden',
                display: 'block',
                position: 'relative',
                boxShadow: isHovered 
                    ? (theme.palette.mode === 'light' ? '0 10px 30px rgba(0,0,0,0.08)' : '0 10px 30px rgba(0,0,0,0.4)')
                    : (theme.palette.mode === 'light' ? '0 4px 10px rgba(0,0,0,0.04)' : '0 8px 20px rgba(0,0,0,0.2)'),
                transition: '0.3s all ease-in-out',
                height: '380px', // Reduced from 460px
                border: theme.palette.mode === 'light' ? '1px solid rgba(0,0,0,0.05)' : `1px solid ${theme.palette.divider}`,
                '&:hover': {
                    borderColor: '#FF2625'
                }
            }}
        >
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                    src={`http://localhost:5000/api/exercises/proxy-image?id=${exercise.id}`} 
                    alt={exercise.name} 
                    loading="lazy" 
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }} // Reduced from 320px
                />
                
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                bottom: 15,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 10
                            }}
                        >
                            <Button 
                                variant="contained" 
                                startIcon={<VisibilityIcon sx={{ fontSize: '16px' }} />}
                                size="small"
                                sx={{ 
                                    bgcolor: '#FF2625', 
                                    borderRadius: '20px', 
                                    px: 2,
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    '&:hover': { bgcolor: '#e02221' }
                                }}
                            >
                                Details
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <IconButton 
                    onClick={handleToggleFavorite}
                    size="small"
                    sx={{ 
                        position: 'absolute', 
                        top: 15, 
                        right: 15, 
                        bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(5px)',
                        '&:hover': { bgcolor: '#fff', color: '#FF2625' },
                        color: isFav ? '#FF2625' : theme.palette.text.secondary,
                        zIndex: 11
                    }}
                >
                    {isFav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                </IconButton>
            </Box>
            
            <Box sx={{ p: '15px' }}> {/* Reduced padding from 20px 25px */}
                <Stack direction="row" spacing={1} mb={1.5}>
                    <Typography sx={{ 
                        color: '#fff', 
                        background: '#FF2625', 
                        fontSize: '10px', 
                        borderRadius: '20px', 
                        textTransform: 'uppercase', 
                        px: 1.5, py: 0.3,
                        fontWeight: '800'
                    }}>
                        {exercise.bodyPart}
                    </Typography>
                    <Typography sx={{ 
                        color: '#000', 
                        background: '#FCC757', 
                        fontSize: '10px', 
                        borderRadius: '20px', 
                        textTransform: 'uppercase', 
                        px: 1.5, py: 0.3,
                        fontWeight: '800'
                    }}>
                        {exercise.target}
                    </Typography>
                </Stack>
                
                <Typography 
                    sx={{ 
                        color: theme.palette.text.primary, 
                        fontWeight: '800', 
                        fontSize: '18px', // Reduced from 20px
                        textTransform: 'capitalize',
                        lineHeight: '1.2',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {exercise.name}
                </Typography>
            </Box>
        </Paper>
    </motion.div>
  );
};

export default ExerciseCard;
