import React, { useState } from 'react';
import { Box, Container } from '@mui/material';

import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';

const SearchPage = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box>
      <Container maxWidth="xl">
        <SearchExercises 
          setExercises={setExercises} 
          bodyPart={bodyPart} 
          setBodyPart={setBodyPart} 
        />
        <Exercises 
          setExercises={setExercises} 
          exercises={exercises} 
          bodyPart={bodyPart} 
        />
      </Container>
    </Box>
  );
};

export default SearchPage;
