import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Container, Stack, CircularProgress, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
import ExerciseCard from '../components/ExerciseCard';
import Loader from '../components/Loader';

const SavedExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExercises(res.data.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [token]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ mt: { lg: '60px', xs: '30px' }, pb: '100px' }}>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" gap={2} mb={6}>
            <FavoriteIcon sx={{ color: '#FF2625', fontSize: '40px' }} />
            <Box>
                <Typography variant="h3" fontWeight="900" letterSpacing="-1px">
                    Your <span style={{ color: '#FF2625' }}>Saved</span> Moves
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="500">
                    Your personal collection of elite exercises.
                </Typography>
            </Box>
        </Stack>

        {exercises.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10, bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
            <Typography variant="h2" sx={{ mb: 2 }}>📚</Typography>
            <Typography variant="h5" fontWeight="800" sx={{ mb: 1 }}>Your library is empty</Typography>
            <Typography variant="body1" color="text.secondary">
              Go to the <span style={{ color: '#FF2625', fontWeight: '700' }}>Exercises</span> page to start building your elite collection.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <AnimatePresence>
                {exercises.map((exercise, index) => (
                    <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ExerciseCard exercise={exercise} />
                        </motion.div>
                    </Grid>
                ))}
            </AnimatePresence>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SavedExercises;
