import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Stack, Grid, CircularProgress, TextField, Button,
  Paper, useTheme, LinearProgress, Avatar, Chip, Checkbox, Divider,
  Tooltip, Skeleton, InputAdornment, Dialog, DialogContent, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ConstructionIcon from '@mui/icons-material/Construction';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';
import { AuthContext } from '../context/AuthContext';
import ExerciseCard from '../components/ExerciseCard';
import axios from 'axios';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import { motion, AnimatePresence } from 'framer-motion';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import CakeIcon from '@mui/icons-material/Cake';
import SearchIcon from '@mui/icons-material/Search';

// New Interactive Components
import DailyTracker from '../components/DailyTracker';
import AnalyticsCharts from '../components/AnalyticsCharts';
import MealLogger from '../components/MealLogger';
import WeeklyPlanner from '../components/WeeklyPlanner';
import Achievements from '../components/Achievements';



// ─── Sub-Components ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

function StatCard({ icon, label, value, color }) {
  const theme = useTheme();
  return (
    <Paper elevation={0} sx={{ 
      p: 2.5, 
      borderRadius: '12px', 
      textAlign: 'center', 
      flex: 1, 
      border: `1px solid ${theme.palette.divider}`, 
      minWidth: 100,
      boxShadow: 'var(--shadow-soft)',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': { transform: 'translateY(-4px)' }
    }}>
      <Box sx={{ color, fontSize: 32, mb: 1, display: 'flex', justifyContent: 'center' }}>{icon}</Box>
      <Typography variant="h4" fontWeight="800" color="text.primary" sx={{ mb: 0.5 }}>{value}</Typography>
      <Typography variant="body2" color="text.secondary" fontWeight="600">{label}</Typography>
    </Paper>
  );
}


function ExerciseRow({ ex, idx, onClick }) {
  const theme = useTheme();
  return (
    <motion.div 
      custom={idx} 
      initial="hidden" 
      animate="visible" 
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Paper 
        elevation={0} 
        onClick={() => onClick(ex)}
        sx={{ 
          p: 2, borderRadius: '14px', display: 'flex', alignItems: 'center', gap: 2, 
          border: `1px solid ${theme.palette.divider}`, mb: 1.5,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#FF2625',
            bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 38, 37, 0.02)' : 'rgba(255, 38, 37, 0.05)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }
        }}
      >
        <Avatar sx={{ bgcolor: 'rgba(255,38,37,0.1)', color: '#FF2625', width: 42, height: 42, fontWeight: 800, fontSize: 13 }}>{idx + 1}</Avatar>
        <Box flex={1}>
          <Typography fontWeight="700" variant="body1">{ex.name}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{ex.muscle} · {ex.tip || ex.target}</Typography>
        </Box>
        <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="flex-end">
          <Chip label={`${ex.sets} sets`} size="small" sx={{ bgcolor: 'rgba(255,38,37,0.08)', color: '#FF2625', fontWeight: 700, fontSize: 11 }} />
          <Chip label={ex.reps} size="small" sx={{ bgcolor: 'rgba(255,140,0,0.08)', color: '#FF8C00', fontWeight: 700, fontSize: 11 }} />
        </Stack>
      </Paper>
    </motion.div>
  );
}

// ─── Detail Modal Component ───────────────────────────────────────────────────
function ExerciseDetailModal({ open, onClose, exercise }) {
  const theme = useTheme();
  const [mode, setMode] = useState('preview'); // 'preview' | 'full'

  // Reset to preview mode when modal opens or exercise changes
  useEffect(() => {
    if (open) setMode('preview');
  }, [open, exercise?.id]);

  if (!exercise) return null;

  const RenderPreview = () => (
    <motion.div
      key="preview"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <DialogContent sx={{ p: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h4" fontWeight="900" color="text.primary" textTransform="capitalize" mb={1}>
              {exercise.name}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <Chip 
                icon={<FitnessCenterIcon sx={{ fontSize: '14px' }} />} 
                label={exercise.muscle || exercise.target} 
                sx={{ bgcolor: 'rgba(255,38,37,0.1)', color: '#FF2625', fontWeight: 800, textTransform: 'capitalize' }} 
              />
              <Chip 
                icon={<InfoIcon sx={{ fontSize: '14px' }} />} 
                label={`${exercise.sets} Sets × ${exercise.reps}`} 
                sx={{ bgcolor: 'rgba(255,140,0,0.1)', color: '#FF8C00', fontWeight: 800 }} 
              />
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="800" mb={1.5} color="text.primary">Quick Overview</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {exercise.instructions || exercise.tip || "Get ready to hit your goals with this focused movement. Remember to maintain proper posture and a steady breathing rhythm for best results."}
        </Typography>

        <Button 
          fullWidth 
          variant="contained" 
          onClick={() => setMode('full')}
          sx={{ 
            py: 2, borderRadius: '16px', 
            background: 'linear-gradient(135deg,#FF2625,#FF8C00)',
            fontWeight: '800', fontSize: '16px',
            boxShadow: '0 8px 20px rgba(255,38,37,0.3)',
            textTransform: 'none'
          }}
          endIcon={<PlayCircleIcon />}
        >
          View Full Details & Animation
        </Button>
      </DialogContent>
    </motion.div>
  );

  const RenderFull = () => (
    <motion.div
      key="full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: 320, bgcolor: '#f5f5f5' }}>
        <IconButton
          onClick={() => setMode('preview')}
          sx={{
            position: 'absolute', left: 16, top: 16, zIndex: 10,
            bgcolor: 'rgba(255,255,255,0.9)', color: '#000',
            '&:hover': { bgcolor: '#fff' }
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        
        <img 
          src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/exercises/proxy-image?id=${exercise.id}`} 
          alt={exercise.name} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Preview'; }}
        />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
           <Typography variant="h5" fontWeight="900" color="#fff" textTransform="capitalize">{exercise.name}</Typography>
        </Box>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={6}>
             <Stack spacing={0.5}>
               <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase' }}>Target Group</Typography>
               <Typography variant="body1" fontWeight="700" sx={{ textTransform: 'capitalize' }}>{exercise.target || exercise.muscle}</Typography>
             </Stack>
          </Grid>
          <Grid item xs={6}>
             <Stack spacing={0.5}>
               <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase' }}>Equipment</Typography>
               <Typography variant="body1" fontWeight="700" sx={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                 <ConstructionIcon sx={{ fontSize: 16, color: '#FF2625' }} /> {exercise.equipment || 'No specialized gear'}
               </Typography>
             </Stack>
          </Grid>
        </Grid>

        <Typography variant="h6" fontWeight="800" mb={1.5} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon sx={{ color: '#FF2625' }} /> Step-by-Step Guide
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4, whiteSpace: 'pre-line' }}>
          {exercise.instructions || exercise.tip || "Standard movement protocols apply. Focus on a controlled eccentic phase and explosive concentric phase."}
        </Typography>

        <Box sx={{ p: 2.5, borderRadius: '16px', bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)', border: `1px dashed ${theme.palette.divider}` }}>
          <Typography variant="h6" fontWeight="800" mb={1.5} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '16px' }}>
            <EmojiObjectsIcon sx={{ color: '#FCC757' }} /> Pro Tip
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {exercise.tip || "Keep your chin tucked and spine neutral. Exhale on the exertion for maximum power output and stability."}
          </Typography>
        </Box>

        {exercise.secondaryMuscles?.length > 0 && (
          <Box mt={4}>
            <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', display: 'block', mb: 1 }}>Secondary Muscles</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {exercise.secondaryMuscles.map(m => (
                <Chip key={m} label={m} size="small" variant="outlined" sx={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '11px' }} />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>
    </motion.div>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '28px',
          overflow: 'hidden',
          bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px) saturate(180%)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute', right: 16, top: 16, zIndex: 11,
            bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)', 
            color: theme.palette.text.primary,
            '&:hover': { bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <AnimatePresence mode="wait">
          {mode === 'preview' ? RenderPreview() : RenderFull()}
        </AnimatePresence>
      </Box>
    </Dialog>
  );
}

function MealCard({ label, emoji, data, checked, onCheck }) {
  const theme = useTheme();
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, opacity: checked ? 0.55 : 1, transition: 'opacity 0.3s' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="h6">{emoji}</Typography>
          <Typography fontWeight="800">{label}</Typography>
        </Stack>
        <Tooltip title={checked ? 'Mark incomplete' : 'Mark as eaten'}>
          <Checkbox checked={checked} onChange={onCheck}
            icon={<CheckCircleIcon sx={{ color: theme.palette.divider }} />}
            checkedIcon={<CheckCircleIcon sx={{ color: '#4caf50' }} />}
          />
        </Tooltip>
      </Stack>
      <Typography variant="body2" color="text.secondary" mb={1.5}>{data.food}</Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Chip label={`${data.cal} kcal`}size="small" sx={{ bgcolor: 'rgba(255,38,37,0.08)', color: '#FF2625', fontWeight: 700 }} />
        <Chip label={`P: ${data.p}g`}  size="small" sx={{ bgcolor: 'rgba(76,175,80,0.1)',  color: '#4caf50',  fontWeight: 700 }} />
        <Chip label={`C: ${data.c}g`}  size="small" sx={{ bgcolor: 'rgba(255,193,7,0.1)',  color: '#FCC757',  fontWeight: 700 }} />
        <Chip label={`F: ${data.f}g`}  size="small" sx={{ bgcolor: 'rgba(33,150,243,0.1)', color: '#2196f3',  fontWeight: 700 }} />
      </Stack>
    </Paper>
  );
}

function PlanSkeleton() {
  return (
    <Grid container spacing={3} mt={1}>
      <Grid item xs={12} lg={7}>
        <Skeleton variant="rounded" height={120} sx={{ borderRadius: '20px', mb: 3 }} />
        <Skeleton variant="rounded" height={320} sx={{ borderRadius: '20px' }} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <Skeleton variant="rounded" height={420} sx={{ borderRadius: '20px', mb: 3 }} />
        <Skeleton variant="rounded" height={180} sx={{ borderRadius: '20px' }} />
      </Grid>
    </Grid>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [goal, setGoal] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [diet, setDiet] = useState(''); // 'veg' | 'nonveg'
  const [loading, setLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(true);
  const [plan, setPlan] = useState(null);
  const [calories, setCalories] = useState(null);
  const [macros, setMacros] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [mealsDone, setMealsDone] = useState({ breakfast: false, lunch: false, snacks: false, dinner: false });
  
  // New Interactive States
  const [dailyStats, setDailyStats] = useState({
    calories: 0,
    water: 0,
    steps: 0,
    workoutDone: false,
    streak: 0,
    workoutsDone: 0,
    goalReachedCount: 0
  });
  const [favSearch, setFavSearch] = useState('');
  
  // Related Exercises States
  const [relatedExercises, setRelatedExercises] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const relatedRef = useRef(null);

  // Detail View States
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const theme = useTheme();

  // Load persistent stats
  useEffect(() => {
    const savedStats = localStorage.getItem('elite_fitness_daily_stats');
    if (savedStats) {
      setDailyStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    setRelatedExercises([]);
  }, [activeDay]);

  const updateDailyStats = (key, value) => {
    setDailyStats(prev => {
      const newStats = { ...prev, [key]: value };
      localStorage.setItem('elite_fitness_daily_stats', JSON.stringify(newStats));
      return newStats;
    });
  };

  const handleLogMeal = (meal) => {
    updateDailyStats('calories', (dailyStats.calories || 0) + meal.calories);
  };

  const bmi = weight && height ? (weight / Math.pow(height / 100, 2)).toFixed(1) : null;
  const getFitnessLevel = () => {
    if (dailyStats.workoutsDone > 50) return 'Advanced';
    if (dailyStats.workoutsDone > 10) return 'Intermediate';
    return 'Beginner';
  };


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/favorites`, { headers: { Authorization: `Bearer ${token}` } });
        setFavorites(res.data.data);
      } catch (_) {}
      finally { setFavLoading(false); }
    };
    fetchFavorites();
  }, [token]);

  const handleOptimize = async () => {
    if (!goal.trim() || !diet) return;
    setLoading(true);
    setPlan(null);

    try {
      // 1. Add artificial delay for better UX perception (Simulating "Intelligent Generation")
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 2. Local-based generation call
      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/ai/recommendation`, {
        goal,
        weight: weight || 70,
        height: height || 170,
        age: age || 25,
        diet
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (res.data.success) {
        const localData = res.data.data;
        
        // 3. Directly map results (Backend now returns perfectly formatted data)
        setCalories(localData.calories);
        setMacros({
          protein: localData.macros.protein,
          carbs: localData.macros.carbs,
          fat: localData.macros.fats
        });
        
        setPlan({
          goalKey: localData.goalKey,
          diet: localData.diet,
          meals: localData.meals,
          schedule: localData.schedule,
          exercises: localData.workout
        });

        setActiveDay(0);
        setMealsDone({ breakfast: false, lunch: false, snacks: false, dinner: false });
      }
    } catch (err) {
      console.error('Local Plan Generation Error:', err);
      alert('Failed to generate your personalized plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleSavePlan = () => {
    if (!plan) return;
    
    try {
      const savedPlans = JSON.parse(localStorage.getItem('elite_fitness_plans') || '[]');
      
      const newPlan = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        goal: goal || plan.goalKey,
        diet: plan.diet,
        weight,
        height,
        calories: calories.target,
        macros,
        meals: plan.meals,
        schedule: plan.schedule,
        exercises: plan.exercises
      };
      
      localStorage.setItem('elite_fitness_plans', JSON.stringify([newPlan, ...savedPlans]));
      
      alert('Plan saved successfully! Redirecting to My Plans...');
      navigate('/plans');
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan. Please try again.');
    }
  };

  const toggleMeal = (k) => setMealsDone(prev => ({ ...prev, [k]: !prev[k] }));



  const getTargetMuscle = (focus) => {
    const mapping = {
      chest: 'pectorals',
      back: 'lats',
      legs: 'quads',
      shoulders: 'delts',
      arms: 'biceps',
      hiit: 'cardiovascular system',
      cardio: 'cardiovascular system',
      upper: 'pectorals',
      lower: 'quads',
      fullbody: 'abs',
      core: 'abs',
      coreupper: 'abs',
      corelower: 'abs',
      active: 'cardiovascular system'
    };
    return mapping[focus.toLowerCase()] || 'abs';
  };

  const handleGetRelated = async () => {
    if (!plan) return;
    const focus = plan.schedule[activeDay].focus;
    const target = getTargetMuscle(focus);
    
    setLoadingRelated(true);
    setRelatedExercises([]);

    try {
      // Use the existing fetchData utility which calls backend proxy /api/exercises/target/:target
      const data = await fetchData(`/exercises/target/${target}`, exerciseOptions);
      
      const mapped = data.slice(0, 6).map(ex => ({
        ...ex,
        muscle: ex.target,
        sets: '3',
        reps: '10-12',
        tip: `Focus on ${ex.target} activation`
      }));

      setRelatedExercises(mapped);
      
      // Smooth scroll to results
      setTimeout(() => {
        relatedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } finally {
      setLoadingRelated(false);
    }
  };

  const handleExerciseClick = async (ex) => {
    // Show what we have instantly
    setSelectedExercise(ex);
    setIsDetailOpen(true);

    // If it's a discovered exercise or missing details, fetch full version
    if (ex.id && !ex.instructions) {
      try {
        const fullData = await fetchData(`/exercises/${ex.id}`, exerciseOptions);
        if (fullData) {
          setSelectedExercise(prev => ({ ...prev, ...fullData }));
        }
      } catch (err) {
        console.error('Failed to fetch full exercise details');
      }
    }
  };

  const MEAL_ORDER = [
    { key: 'breakfast', label: 'Breakfast', emoji: '🌅' },
    { key: 'lunch',     label: 'Lunch',     emoji: '☀️' },
    { key: 'snacks',    label: 'Snacks',    emoji: '🍎' },
    { key: 'dinner',    label: 'Dinner',    emoji: '🌙' },
  ];

  const currentExercises = plan ? (plan.exercises[plan.schedule[activeDay].focus] || []) : [];

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, maxWidth: '1400px', margin: '0 auto', pb: 10, pt: 4 }} className="fade-in">
      
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" mb={6}>
          <Avatar sx={{ 
            width: 100, 
            height: 100, 
            bgcolor: '#FF4D4D', 
            fontSize: '40px', 
            fontWeight: 900, 
            boxShadow: '0 10px 25px rgba(255,77,77,0.3)' 
          }}>
            {user?.name?.[0]?.toUpperCase()}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h2" fontWeight="800" color="text.primary" sx={{ letterSpacing: '-1px', mb: 1 }}>
              Hello, {user?.name}! 👋
            </Typography>
            <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
              <Typography variant="h6" color="text.secondary" fontWeight="500">
                Ready to crush your goals?
              </Typography>
              {bmi && <Chip label={`BMI: ${bmi}`} size="small" sx={{ bgcolor: 'rgba(255,140,0,0.1)', color: '#FF8C00', fontWeight: 700, borderRadius: '8px' }} />}
              <Chip label={getFitnessLevel()} size="small" sx={{ bgcolor: 'rgba(76,175,80,0.1)', color: '#4CAF50', fontWeight: 700, borderRadius: '8px' }} />
            </Stack>
          </Box>
          <Stack direction="row" gap={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
            <StatCard icon={<FitnessCenterIcon />}        label="Workouts"  value={dailyStats.workoutsDone}  color="#FF4D4D" />
            <StatCard icon={<LocalFireDepartmentIcon />}  label="Calories"  value={`${(dailyStats.calories/1000).toFixed(1)}k`} color="#FF8C00" />
            <StatCard icon={<EmojiEventsIcon />}          label="Streak"    value={`${dailyStats.streak}d`}  color="#FCC757" />
          </Stack>
        </Stack>
      </motion.div>

      {/* Daily Stats Tracker */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <DailyTracker dailyStats={dailyStats} updateStats={updateDailyStats} />
      </motion.div>

      <Grid container spacing={4}>
        {/* LEFT COLUMN - Main Activity */}
        <Grid item xs={12} lg={8}>
          
          {/* Analytics Charts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <AnalyticsCharts />
          </motion.div>

          {/* Input Panel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <Paper id="ai-plan-generator" elevation={0} sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: '12px', 
              mb: 4, 
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: 'var(--shadow-soft)',
              background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.02)'
            }}>
              <Stack direction="row" alignItems="center" gap={2} mb={4}>
                <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(255,77,77,0.1)', color: '#FF4D4D', display: 'flex' }}>
                  <SelfImprovementIcon sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="700">AI Plan Generator</Typography>
                  <Typography variant="body2" color="text.secondary">Professional guidance tailored exactly to you</Typography>
                </Box>
              </Stack>

              <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Weight" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} type="number"
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><ScaleIcon sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment>, 
                      endAdornment: <InputAdornment position="end" sx={{ fontWeight: 600 }}>kg</InputAdornment> 
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Height" placeholder="170" value={height} onChange={e => setHeight(e.target.value)} type="number"
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><HeightIcon sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment>, 
                      endAdornment: <InputAdornment position="end" sx={{ fontWeight: 600 }}>cm</InputAdornment> 
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Age" placeholder="25" value={age} onChange={e => setAge(e.target.value)} type="number"
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><CakeIcon sx={{ color: 'text.secondary', fontSize: 20 }} /></InputAdornment>, 
                      endAdornment: <InputAdornment position="end" sx={{ fontWeight: 600 }}>yrs</InputAdornment> 
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                </Grid>
              </Grid>

              <Box mb={4}>
                <Typography variant="body1" fontWeight="600" color="text.primary" mb={2}>Select Your Diet</Typography>
                <Stack direction="row" gap={2}>
                  {[{ val: 'veg', label: '🥦 Vegetarian', sub: 'Plant-based' }, { val: 'nonveg', label: '🍗 Non-Vegetarian', sub: 'Include proteins' }].map(opt => (
                    <Paper key={opt.val} onClick={() => setDiet(opt.val)} elevation={0}
                      sx={{ 
                        p: 2.5, 
                        borderRadius: '12px', 
                        cursor: 'pointer', 
                        flex: 1, 
                        border: diet === opt.val ? '2px solid #FF4D4D' : `1px solid ${theme.palette.divider}`, 
                        bgcolor: diet === opt.val ? 'rgba(255, 77, 77, 0.02)' : 'transparent',
                        transition: 'all 0.2s ease',
                        '&:hover': { bgcolor: 'rgba(255, 77, 77, 0.01)', borderColor: diet === opt.val ? '#FF4D4D' : theme.palette.divider }
                      }}>
                      <Typography fontWeight="700">{opt.label}</Typography>
                      <Typography variant="caption" color="text.secondary">{opt.sub}</Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="stretch">
                <TextField fullWidth label="Your Fitness Goal" placeholder="e.g. Lose 5kg in 2 months" value={goal} onChange={e => setGoal(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <Button 
                  variant="contained" 
                  onClick={handleOptimize} 
                  disabled={loading || !goal.trim() || !diet}
                  disableElevation
                  sx={{ 
                    px: 6, 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg,#FF4D4D,#FF8C00)', 
                    color: '#fff',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '16px',
                    minWidth: 200
                  }}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Optimize Now'}
                </Button>
              </Stack>
            </Paper>
          </motion.div>

          {loading && <PlanSkeleton />}

          <AnimatePresence>
            {plan && !loading && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <WeeklyPlanner schedule={plan.schedule} activeDay={activeDay} onDayClick={setActiveDay} />
                <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="800">🏋️ {plan.schedule[activeDay].label || plan.schedule[activeDay].day} {plan.schedule[activeDay].icon}</Typography>
                    <Button 
                      onClick={handleGetRelated} 
                      disabled={loadingRelated}
                      size="small" 
                      sx={{ color: '#FF2625', fontWeight: 700, textTransform: 'none' }}
                      startIcon={loadingRelated ? <CircularProgress size={16} sx={{ color: '#FF2625' }} /> : null}
                    >
                      {loadingRelated ? 'Discovering...' : 'Get Related Exercises'}
                    </Button>
                  </Stack>
                  
                  {(relatedExercises.length > 0 ? relatedExercises : currentExercises).length === 0 ? (
                    <Typography py={5} textAlign="center" color="text.secondary">
                      {plan.schedule[activeDay].focus === 'Rest' ? 'Rest day! Enjoy your recovery. 🧘' : 'No exercises found for this session.'}
                    </Typography>
                  ) : (
                    (relatedExercises.length > 0 ? relatedExercises : currentExercises).map((ex, i) => (
                       <ExerciseRow key={i} ex={ex} idx={i} onClick={handleExerciseClick} />
                    ))
                  )}
                  
                  {relatedExercises.length > 0 && (
                    <Box mt={2} textAlign="center">
                      <Button size="small" onClick={() => setRelatedExercises([])} sx={{ color: 'text.secondary', textTransform: 'none' }}>
                        Reset to Original Plan
                      </Button>
                    </Box>
                  )}
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </Grid>

        {/* RIGHT COLUMN - Sidebar */}
        <Grid item xs={12} lg={4}>
          <MealLogger onLogMeal={handleLogMeal} />
          
          {plan && (
            <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
              <Typography variant="h6" fontWeight="800" mb={2}>Elite Meal Plan</Typography>
              <Stack spacing={2}>
                {MEAL_ORDER.map(({ key, label, emoji }) => (
                  <MealCard key={key} label={label} emoji={emoji} data={plan.meals[key]}
                    checked={mealsDone[key]} onCheck={() => toggleMeal(key)} />
                ))}
              </Stack>
            </Paper>
          )}

          <Achievements stats={dailyStats} />

          {plan && (
            <Paper elevation={0} sx={{ p: 3, borderRadius: '24px', border: `1px solid ${theme.palette.divider}`, mb: 4 }}>
              <Typography variant="h6" fontWeight="800" mb={2}>Goals Achievement</Typography>
              <Box mb={2}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Calories</Typography>
                  <Typography variant="body2" fontWeight="700">{dailyStats.calories} / {calories.target}</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={Math.min((dailyStats.calories / calories.target) * 100, 100)} sx={{ height: 10, borderRadius: 5 }} />
              </Box>
              <Button fullWidth variant="contained" onClick={handleSavePlan} sx={{ borderRadius: '12px', bgcolor: '#FF2625' }}>Save Today's Plan</Button>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Saved Exercises */}
      <Box mt={8} pb={10}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={3} mb={5}>
          <Box>
            <Typography variant="h4" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>
              My Saved <span style={{ color: '#FF4D4D' }}>Exercises</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="500">Quick access to your favorite movements</Typography>
          </Box>
          <TextField 
            placeholder="Search saved..." 
            size="small" 
            value={favSearch} 
            onChange={(e) => setFavSearch(e.target.value)}
            InputProps={{ 
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />,
              sx: { borderRadius: '12px', bgcolor: theme.palette.background.paper }
            }}
            sx={{ minWidth: { xs: '100%', md: 300 } }} 
          />
        </Stack>

        {favLoading ? (
          <Box display="flex" justifyContent="center" py={10}><CircularProgress sx={{ color: '#FF4D4D' }} /></Box>
        ) : (
          <Grid container spacing={3}>
            {favorites.filter(ex => ex.name.toLowerCase().includes(favSearch.toLowerCase())).map((ex) => (
              <Grid item xs={12} sm={6} md={4} key={ex.id}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  <ExerciseCard exercise={ex} />
                </motion.div>
              </Grid>
            ))}
            {favorites.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '12px', border: `1px dashed ${theme.palette.divider}`, bgcolor: 'transparent' }}>
                  <Typography color="text.secondary">No exercises saved yet. Start exploring!</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
      </Box>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal 
        open={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        exercise={selectedExercise} 
      />
    </Box>
  );
};

export default Dashboard;
