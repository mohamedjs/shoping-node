import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography, Box } from '@mui/material';

export default function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  const handleChange = (categoryId) => (event) => {
    const newSelected = event.target.checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    onCategoryChange(newSelected);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom>Categories</Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category.id}
            control={
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onChange={handleChange(category.id)}
              />
            }
            label={category.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
} 