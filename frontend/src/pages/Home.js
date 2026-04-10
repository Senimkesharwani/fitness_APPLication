import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
import HowItWorks from '../components/HowItWorks';
import Contact from '../components/Contact';
import AboutUs from '../components/AboutUs';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box>
      <HeroBanner />
      
      <Container maxWidth="xl">
        <Box id="how-it-works" sx={{ mt: { lg: '120px', xs: '80px' } }}>
          <HowItWorks />
        </Box>

        <Box sx={{ mt: { lg: '120px', xs: '80px' } }}>
          <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        </Box>

        <Box id="exercises" sx={{ mt: { lg: '120px', xs: '80px' } }}>
          <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
        </Box>

        <Box id="about-us" sx={{ mt: { lg: '120px', xs: '80px' } }}>
          <AboutUs />
        </Box>

        <Box id="contact" sx={{ mt: { lg: '120px', xs: '80px' }, pb: { lg: '100px', xs: '50px' } }}>
          <Contact />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
