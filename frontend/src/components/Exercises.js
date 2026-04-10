import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { 
    Box, 
    Stack, 
    Typography, 
    Grid,
    Button,
    TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(8); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearchTerm('');
    
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('/exercises/rapidapi?url=/exercises&limit=1324', exerciseOptions);
      } else {
        exercisesData = await fetchData(`/exercises/rapidapi?url=/exercises/bodyPart/${bodyPart}&limit=1324`, exerciseOptions);
      }

      setExercises(exercisesData || []);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  useEffect(() => {
    setCurrentPage(1);
  }, [bodyPart, exercises]);

  const handleLocalSearch = async () => {
    if (!searchTerm.trim()) return;
    setSearching(true);
    try {
        const data = await fetchData('/exercises/rapidapi?url=/exercises&limit=1324', exerciseOptions);
        const filtered = data.filter(ex => 
            ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ex.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ex.bodyPart.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setExercises(filtered);
        setCurrentPage(1);
    } catch (err) {
        console.error('Local search failed');
    } finally {
        setSearching(false);
    }
  };

  const safeExercises = Array.isArray(exercises) ? exercises : [];
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = safeExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
    const exercisesSection = document.getElementById('exercises');
    if (exercisesSection) {
        exercisesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!currentExercises.length && !exercises.length) {
    return (
        <Box sx={{ mt: '100px', textAlign: 'center' }}>
            <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
                No exercises found. Try a different search or filter.
            </Typography>
            <Button variant="outlined" onClick={() => setSearchTerm('')} sx={{ borderRadius: '20px' }}>
                Clear Search
            </Button>
        </Box>
    );
  }

  if (!currentExercises.length) return <Loader />;

  return (
    <Box 
        id="exercises" 
        sx={{ 
            mt: { lg: '20px', xs: '10px' }, 
            width: '100%', 
            scrollMarginTop: '120px', 
            minHeight: { lg: '800px', xs: 'auto' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
    >
      
      {/* Professional Dashboard Toolbar */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between" 
        alignItems="center"
        mb="40px"
        width="100%"
        gap={3}
        sx={{ 
            px: { lg: '40px', xs: '10px' },
            py: '10px',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            mt: '-20px' // Compact adjustment
        }}
      >
        <Typography 
            variant="h4" 
            fontWeight="900" 
            sx={{ 
                fontSize: { lg: '36px', xs: '26px' }, 
                letterSpacing: '-1px',
                color: (theme) => theme.palette.text.primary 
            }}
        >
          Showing <span style={{ color: '#FF2625' }}>Results</span>
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' }, maxWidth: '450px' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLocalSearch()}
            InputProps={{
                startAdornment: <SearchIcon sx={{ color: '#FF2625', mr: 1, fontSize: '20px' }} />,
                sx: { 
                    borderRadius: '40px', 
                    bgcolor: (theme) => theme.palette.mode === 'light' ? '#f0f2f5' : 'rgba(255,255,255,0.05)', 
                    px: 1.5, 
                    fontSize: '14px',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover': { bgcolor: (theme) => theme.palette.mode === 'light' ? '#e4e6e9' : 'rgba(255,255,255,0.08)' }
                }
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleLocalSearch}
            disabled={searching}
            sx={{ 
                background: 'linear-gradient(135deg, #FF2625, #FF8C00)', 
                borderRadius: '40px', 
                fontWeight: '800', 
                textTransform: 'none', 
                px: 4,
                py: 1,
                fontSize: '14px',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(255, 38, 37, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': { 
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 25px rgba(255, 38, 37, 0.5)',
                    background: 'linear-gradient(135deg, #e02221, #FF8C00)', 
                },
                '&:active': { transform: 'scale(0.95)' }
            }}
          >
            Search
          </Button>
        </Stack>
      </Stack>
      
      <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', maxWidth: '1400px', mx: 'auto' }}>
        {currentExercises.map((exercise, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>
      <Stack sx={{ mt: { lg: '100px', xs: '60px' }, mb: '20px' }} alignItems="center" justifyContent="center">
        {exercises.length > 8 && (
          <Pagination
            color="primary"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            sx={{
                '& .MuiPaginationItem-root': {
                    fontSize: '18px',
                    fontWeight: '700',
                    borderRadius: '10px',
                    '&.Mui-selected': {
                        bgcolor: '#FF2625',
                        color: '#fff',
                        '&:hover': { bgcolor: '#e02221' }
                    }
                }
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
