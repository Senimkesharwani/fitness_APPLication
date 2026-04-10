import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { 
    Box, 
    Stack, 
    Typography, 
    Grid 
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
      
      {/* Refined Header with Split Layout */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        mb="40px"
        width="100%"
        gap={3}
        sx={{ px: { lg: '40px', xs: '0px' } }}
      >
        <Typography 
            variant="h4" 
            fontWeight="900" 
            sx={{ fontSize: { lg: '40px', xs: '28px' }, letterSpacing: '-0.5px' }}
        >
          Showing <span style={{ color: '#FF2625' }}>Results</span>
        </Typography>

        <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' }, maxWidth: '400px' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Quick search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLocalSearch()}
            InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: '20px' }} />,
                sx: { borderRadius: '25px', bgcolor: 'rgba(0,0,0,0.03)', px: 1, fontSize: '14px' }
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleLocalSearch}
            disabled={searching}
            sx={{ 
                bgcolor: '#FF2625', 
                borderRadius: '25px', 
                fontWeight: '700', 
                textTransform: 'none', 
                px: 3,
                fontSize: '14px',
                '&:hover': { bgcolor: '#e02221' }
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
