import React, { useState, useEffect, useContext } from 'react';
import { Typography, Stack, Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, name, target, equipment, _id } = exerciseDetail;
  const { token } = useContext(AuthContext);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/favorites`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const favorites = res.data.data;
        setIsFav(favorites.some(fav => fav._id === _id || fav.id === exerciseDetail.id));
      } catch (err) {
        console.error('Error checking favorites');
      }
    };
    checkFavorite();
  }, [_id, token, exerciseDetail.id]);

  const handleToggleFavorite = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/favorites`, 
        { exerciseId: _id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFav(!isFav);
    } catch (err) {
        alert('Failed to toggle favorite');
    }
  };

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      <img 
        src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/exercises/proxy-image?id=${exerciseDetail.id}`} 
        alt={name} 
        loading="lazy" 
        className="detail-image" 
        onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/800x800?text=Exercise+Preview+Unavailable';
        }}
      />
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
            {name}
            </Typography>
            <IconButton onClick={handleToggleFavorite} sx={{ color: '#FF2625' }}>
                {isFav ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
            </IconButton>
        </Stack>
        <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
          Exercises keep you strong.{' '}
          <span style={{ textTransform: 'capitalize' }}>{name}</span> bup is one
          of the best <br /> exercises to target your {target}. It will help you improve your{' '}
          <br /> mood and gain energy.
        </Typography>
        {extraDetail?.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={bodyPart} style={{ width: '50px', height: '50px' }} />
            </Button>
            <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
