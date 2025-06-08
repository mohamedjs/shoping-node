import React from 'react';
import { Rating, Typography, Box } from '@mui/material';

export default function RateFilter({ selectedRate, onRateChange }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom>Minimum Rating</Typography>
      <Rating
        value={selectedRate}
        onChange={(event, newValue) => {
          onRateChange(newValue);
        }}
        precision={0.5}
      />
    </Box>
  );
} 