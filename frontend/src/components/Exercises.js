import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { 
    Box, 
    Stack, 
    Typography, 
    Grid, 
    TextField, 
    Button, 
    InputAdornment, 
    useTheme 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(8); 
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      const rapidApiBase = 'https://exercisedb.p.rapidapi.com/exercises';

      if (bodyPart === 'all') {
        // Fetch the definitive library for 167-page coverage (1324 total exercises)
        exercisesData = await fetchData(`${rapidApiBase}?limit=1324`, exerciseOptions);
      } else {
        // Fetch target bodypart with definitive coverage
        exercisesData = await fetchData(`${rapidApiBase}/bodyPart/${bodyPart}?limit=1324`, exerciseOptions);
      }

      setExercises(exercisesData || []);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // Internal State Reset for dynamic pagination
  useEffect(() => {
    setCurrentPage(1);
  }, [bodyPart, exercises]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

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
            <Typography variant="h5" color="textSecondary">
                No exercises found. Try a different search or filter.
            </Typography>
        </Box>
    );
  }

  if (!currentExercises.length) return <Loader />;

  return (
    <Box id="exercises" sx={{ mt: { lg: '10px', xs: '5px' }, width: '100%', scrollMarginTop: '100px' }}>
      
      {/* Header with Heading and Compact Search */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={3}
        mb="20px"
      >
        <Typography 
            variant="h4" 
            fontWeight="bold" 
            sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        >
          Showing <span style={{ color: '#FF2625' }}>Results</span>
        </Typography>
      </Stack>
      
      <Grid container spacing={4} justifyContent="center">
        {currentExercises.map((exercise, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>

      <Stack sx={{ mt: { lg: '60px', xs: '40px' } }} alignItems="center" justifyContent="center">
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
