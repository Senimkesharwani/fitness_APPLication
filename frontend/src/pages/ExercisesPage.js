import React, { useState } from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ExercisesPage = () => {
    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');
    const theme = useTheme();

    return (
        <Box sx={{ mt: { lg: '40px', xs: '20px' }, pb: '100px' }}>
            <Container maxWidth="xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <Typography 
                            variant="h2" 
                            fontWeight="900" 
                            sx={{ 
                                fontSize: { lg: '56px', xs: '36px' }, 
                                mb: 2,
                                letterSpacing: '-2px'
                            }}
                        >
                            Explore Our <span style={{ color: '#FF2625' }}>Elite</span> Library
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <FitnessCenterIcon sx={{ color: '#FF2625' }} />
                            <Typography variant="h6" color="text.secondary" fontWeight="500">
                                Thousands of exercises at your fingertips
                            </Typography>
                        </Box>
                    </Box>
                </motion.div>

                <Box id="search-section">
                    <SearchExercises 
                        setExercises={setExercises} 
                        bodyPart={bodyPart} 
                        setBodyPart={setBodyPart} 
                    />
                </Box>

                <Box id="exercises-list" sx={{ mt: 10 }}>
                    <Exercises 
                        setExercises={setExercises} 
                        exercises={exercises} 
                        bodyPart={bodyPart} 
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default ExercisesPage;
