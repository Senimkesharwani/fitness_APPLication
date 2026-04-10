import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        console.log('[Diagnostic] Fetching Body Parts Categories...');
        // Direct call to RapidAPI for high availability
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        
        // Use API data if valid
        if (Array.isArray(bodyPartsData) && bodyPartsData.length > 0) {
            console.log('[Diagnostic] Body Parts List Load Success:', bodyPartsData);
            const uniqueBodyParts = bodyPartsData.includes('all') ? bodyPartsData : ['all', ...bodyPartsData];
            setBodyParts(uniqueBodyParts);
        } else {
            console.warn('[Diagnostic] Body Parts List API returned empty or invalid data.');
            setBodyParts(['all']); // At least provide "all" to prevent UI crash
        }
      } catch (error) {
          console.error('[Diagnostic] Body Parts Load FAILED.', error);
          setBodyParts(['all']); 
      }
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      console.log('Searching for:', search);
      // Fetching from the official RapidAPI endpoint with definitive library limit
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1300', exerciseOptions);
      console.log('ExerciseDB Response:', exercisesData);

      const searchedExercises = exercisesData.filter(
        (item) => item.name.toLowerCase().includes(search)
               || item.target.toLowerCase().includes(search)
               || item.equipment.toLowerCase().includes(search)
               || item.bodyPart.toLowerCase().includes(search),
      );

      const exercisesSection = document.getElementById('exercises');
      if (exercisesSection) {
        exercisesSection.scrollIntoView({ behavior: 'smooth' });
      }

      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack id="search" alignItems="center" justifyContent="center" p="20px" sx={{ py: '60px', width: '100%', scrollMarginTop: '100px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Typography sx={{ 
            fontWeight: '800', 
            fontSize: { lg: '46px', md: '38px', xs: '26px' }, // Slightly reduced from 48px to fit one line
            textAlign: 'center', 
            mb: '50px', 
            color: theme.palette.text.primary,
            whiteSpace: { lg: 'nowrap', xs: 'normal' }, // Forced single line on desktop
            lineHeight: 1.2
        }}>
          Discover Your Next <span style={{ color: '#FF2625' }}>Workout</span>
        </Typography>
      </motion.div>

      <Box position="relative" mb="80px" sx={{ width: '100%', maxWidth: '850px' }}>
        <TextField
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search for exercises, muscles or equipment..."
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#FF2625', ml: 1, fontSize: '24px' }} />
              </InputAdornment>
            ),
            sx: {
              height: '72px', // Standardized height
              borderRadius: '40px',
              px: { lg: '25px', xs: '15px' },
              fontSize: '18px',
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.palette.mode === 'light' ? '0 15px 45px rgba(0,0,0,0.06)' : '0 15px 45px rgba(0,0,0,0.3)',
              color: theme.palette.text.primary,
              '& .MuiOutlinedInput-notchedOutline': {
                border: theme.palette.mode === 'light' ? 'none' : `1px solid ${theme.palette.divider}`,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FF2625',
              },
              '& input::placeholder': {
                  opacity: 0.6
              }
            }
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
            className="search-btn" 
            sx={{ 
                bgcolor: '#FF2625', 
                color: '#fff', 
                textTransform: 'none', 
                width: { lg: '160px', xs: '100px' }, 
                height: '62px', // Matched height with internal padding adjustment
                position: 'absolute', 
                right: '5px', 
                top: '5px',
                borderRadius: '35px',
                fontSize: { lg: '18px', xs: '15px' },
                fontWeight: '700',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(255, 38, 37, 0.2)',
                '&:hover': {
                    bgcolor: '#e02221',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 8px 20px rgba(255, 38, 37, 0.3)',
                },
                '&:active': {
                    transform: 'translateY(1px)',
                }
            }} 
            onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: 'relative', width: '100%', px: { lg: '40px', xs: '10px' } }}>
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
