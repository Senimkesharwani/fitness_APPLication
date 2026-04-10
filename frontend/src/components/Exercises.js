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
        // Direct RapidAPI call with speed optimization
        exercisesData = await fetchData(`${rapidApiBase}?limit=10`, exerciseOptions);
      } else {
        // Direct bodypart fetch with speed optimization
        exercisesData = await fetchData(`${rapidApiBase}/bodyPart/${bodyPart}?limit=10`, exerciseOptions);
      }

      setExercises(exercisesData || []);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // Handle Internal Search
  const handleInternalSearch = async () => {
    if (searchTerm) {
        const exercisesData = await fetchData('/exercises', exerciseOptions);
        
        const filtered = exercisesData.filter(
            (ex) => ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    ex.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    ex.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    ex.bodyPart.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setSearchTerm('');
        setExercises(filtered);
    }
  };

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

        <Box 
            sx={{ 
                display: 'flex', 
                gap: '10px', 
                width: { xs: '100%', md: 'auto' },
                maxWidth: '400px'
            }}
        >
            <TextField
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find an exercise..."
                onKeyPress={(e) => e.key === 'Enter' && handleInternalSearch()}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#FF2625', fontSize: 20 }} />
                        </InputAdornment>
                    ),
                    sx: {
                        borderRadius: '12px',
                        backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.05)',
                        '& fieldset': { borderColor: theme.palette.divider }
                    }
                }}
                sx={{ flex: 1 }}
            />
            <Button
                variant="contained"
                onClick={handleInternalSearch}
                sx={{ 
                    bgcolor: '#FF2625', 
                    borderRadius: '12px',
                    fontWeight: '700',
                    px: 3,
                    '&:hover': { bgcolor: '#e02221', transform: 'scale(1.02)' },
                    transition: '0.3s'
                }}
            >
                Search
            </Button>
        </Box>
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
