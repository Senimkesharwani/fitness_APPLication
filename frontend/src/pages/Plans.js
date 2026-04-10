import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, Stack, Paper, useTheme, Avatar, 
  Grid, Button, IconButton, Chip, Divider, Collapse, Card, CardContent 
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion, AnimatePresence } from 'framer-motion';

const PlanCard = ({ plan, onDelete }) => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);

    const isVeg = plan.diet === 'veg';

    return (
        <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
            <Card 
                elevation={0} 
                sx={{ 
                    mb: 3, 
                    borderRadius: '24px', 
                    border: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.03)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': { boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Stack direction="row" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: isVeg ? 'rgba(76,175,80,0.1)' : 'rgba(255,38,37,0.1)', color: isVeg ? '#4caf50' : '#FF2625', width: 50, height: 50 }}>
                                <EventNoteIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" fontWeight="900" sx={{ textTransform: 'capitalize' }}>{plan.goal}</Typography>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <CalendarTodayIcon sx={{ fontSize: '14px', color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary" fontWeight="600">Saved on {plan.date}</Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack direction="row" gap={1.5} alignItems="center">
                            <Chip 
                                label={isVeg ? '🥦 Vegetarian' : '🍗 Non-Veg'} 
                                size="small" 
                                sx={{ bgcolor: isVeg ? 'rgba(76,175,80,0.1)' : 'rgba(255,38,37,0.1)', color: isVeg ? '#4caf50' : '#FF2625', fontWeight: 800 }} 
                            />
                            <Chip 
                                label={`${plan.calories} kcal`} 
                                size="small" 
                                sx={{ bgcolor: 'rgba(255,140,0,0.1)', color: '#FF8C00', fontWeight: 800 }} 
                            />
                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            <IconButton onClick={() => setExpanded(!expanded)} color="primary" sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)' }}>
                                {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            <IconButton onClick={() => onDelete(plan.id)} sx={{ color: 'error.main', bgcolor: 'rgba(211, 47, 47, 0.05)', '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.1)' } }}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Divider />
                        <Box sx={{ p: 4, bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.01)' : 'rgba(255,255,255,0.01)' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row" alignItems="center" gap={1} mb={2}>
                                        <RestaurantIcon sx={{ color: '#FF8C00', fontSize: '20px' }} />
                                        <Typography variant="subtitle1" fontWeight="800">Nutrition Overview</Typography>
                                    </Stack>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                        <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', textAlign: 'center' }}>
                                            <Typography variant="h5" fontWeight="900" color="#4caf50">{plan.macros?.protein}g</Typography>
                                            <Typography variant="caption" fontWeight="700">Protein</Typography>
                                        </Paper>
                                        <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', textAlign: 'center' }}>
                                            <Typography variant="h5" fontWeight="900" color="#FCC757">{plan.macros?.carbs}g</Typography>
                                            <Typography variant="caption" fontWeight="700">Carbs</Typography>
                                        </Paper>
                                        <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', textAlign: 'center' }}>
                                            <Typography variant="h5" fontWeight="900" color="#2196f3">{plan.macros?.fat}g</Typography>
                                            <Typography variant="caption" fontWeight="700">Fats</Typography>
                                        </Paper>
                                        <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', textAlign: 'center' }}>
                                            <Typography variant="h5" fontWeight="900" color="#FF2625">{plan.calories}</Typography>
                                            <Typography variant="caption" fontWeight="700">Daily Kcal</Typography>
                                        </Paper>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row" alignItems="center" gap={1} mb={2}>
                                        <FitnessCenterIcon sx={{ color: '#FF2625', fontSize: '20px' }} />
                                        <Typography variant="subtitle1" fontWeight="800">Workout Schedule</Typography>
                                    </Stack>
                                    <Stack spacing={1}>
                                        {plan.schedule?.slice(0, 7).map((s, i) => (
                                            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, borderRadius: '12px', bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                                                <Typography variant="body2" fontWeight="800" sx={{ width: '40px' }}>{s.day}</Typography>
                                                <Typography variant="body2" fontWeight="600">{s.label}</Typography>
                                                <Typography variant="body2">{s.icon}</Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <Button 
                                    variant="contained" 
                                    startIcon={<VisibilityIcon />}
                                    href="/dashboard"
                                    sx={{ 
                                        borderRadius: '12px', 
                                        background: 'linear-gradient(135deg,#FF2625,#FF8C00)', 
                                        fontWeight: '700',
                                        px: 6,
                                        textTransform: 'none'
                                    }}
                                >
                                    Activate This Plan
                                </Button>
                            </Box>
                        </Box>
                    </Collapse>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const Plans = () => {
    const theme = useTheme();
    const [savedPlans, setSavedPlans] = useState([]);

    useEffect(() => {
        const plans = JSON.parse(localStorage.getItem('elite_fitness_plans') || '[]');
        setSavedPlans(plans);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this plan?')) {
            const updatedPlans = savedPlans.filter(p => p.id !== id);
            localStorage.setItem('elite_fitness_plans', JSON.stringify(updatedPlans));
            setSavedPlans(updatedPlans);
        }
    };

    return (
        <Box sx={{ mt: { lg: '60px', xs: '30px' }, pb: '100px' }}>
            <Container maxWidth="md">
                <Stack direction="row" alignItems="center" gap={2} mb={6}>
                    <Avatar sx={{ width: 60, height: 60, bgcolor: 'rgba(255,140,0,0.1)', color: '#FF8C00' }}>
                        <EventNoteIcon sx={{ fontSize: '32px' }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h3" fontWeight="900" letterSpacing="-1px">
                            My Elite <span style={{ color: '#FF8C00' }}>Plans</span>
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight="500">
                            Manage your personalized roadmap to greatness.
                        </Typography>
                    </Box>
                </Stack>

                {savedPlans.length > 0 ? (
                    <AnimatePresence>
                        {savedPlans.map((plan) => (
                            <PlanCard key={plan.id} plan={plan} onDelete={handleDelete} />
                        ))}
                    </AnimatePresence>
                ) : (
                    <Paper elevation={0} sx={{ p: 10, textAlign: 'center', borderRadius: '32px', border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' }}>
                        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>
                            <Avatar sx={{ width: 100, height: 100, bgcolor: 'rgba(255,140,0,0.1)', color: '#FF8C00', margin: '0 auto', mb: 3 }}>
                                <EventNoteIcon sx={{ fontSize: '50px' }} />
                            </Avatar>
                        </motion.div>
                        <Typography variant="h5" fontWeight="900" mb={1}>No Saved Plans Yet</Typography>
                        <Typography color="text.secondary" maxWidth="500px" margin="0 auto" mb={4}>
                            Generate your personalized AI fitness plan in the dashboard and save it to track your evolution.
                        </Typography>
                        <Button 
                            variant="contained" 
                            href="/dashboard"
                            sx={{ 
                                bgcolor: '#FF2625', 
                                borderRadius: '12px', 
                                px: 4, 
                                py: 1.5, 
                                fontWeight: '700',
                                '&:hover': { bgcolor: '#e02221' }
                            }}
                        >
                            Generate My First Plan
                        </Button>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default Plans;
