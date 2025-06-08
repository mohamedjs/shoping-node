import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

export default function SortFilter({ sortBy, onSortChange }) {
  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="price_asc">Price: Low to High</MenuItem>
          <MenuItem value="price_desc">Price: High to Low</MenuItem>
          <MenuItem value="rate_asc">Rating: Low to High</MenuItem>
          <MenuItem value="rate_desc">Rating: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
} 