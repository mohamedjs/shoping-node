import React from 'react';
import { Slider, Typography, Box } from '@mui/material';

export default function PriceFilter({ minPrice, maxPrice, onPriceChange }) {
  const [value, setValue] = React.useState([minPrice, maxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onPriceChange(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={minPrice}
        max={maxPrice}
        valueLabelFormat={(value) => `$${value}`}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2">${value[0]}</Typography>
        <Typography variant="body2">${value[1]}</Typography>
      </Box>
    </Box>
  );
} 