import React, { useState } from 'react';
import { Box } from '@mui/material';

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
      
      <Box id="how-it-works" sx={{ mt: { lg: '40px', xs: '20px' } }}>
        <HowItWorks />
      </Box>

      <Box sx={{ mt: { lg: '40px', xs: '20px' } }}>
        <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      </Box>

      <Box id="exercises" sx={{ mt: { lg: '40px', xs: '20px' } }}>
        <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
      </Box>

      <Box id="about-us" sx={{ mt: { lg: '40px', xs: '20px' } }}>
        <AboutUs />
      </Box>

      <Box id="contact" sx={{ mt: { lg: '40px', xs: '20px' }, mb: { lg: '60px', xs: '30px' } }}>
        <Contact />
      </Box>
    </Box>
  );
};

export default Home;
