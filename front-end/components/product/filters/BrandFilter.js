import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography, Box, Button } from '@mui/material';
import { memo } from 'react';
import { useCallback } from 'react';

const BrandCheckbox = memo(({ brand, checked, onToggle }) => {
  console.log('rerender-check')

  const handleChange = useCallback(() => {
    onToggle(brand);
  }, [brand, onToggle]);

  return (
    <FormControlLabel
      key={brand}
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
        />
      }
      label={brand}
    />
  );
});
const MAX_BRANDS_TO_SHOW = 20;

const BrandFilter = memo(({ brands, selectedBrands, onBrandChange }) => {  
  const [showAll, setShowAll] = React.useState(false);

  const handleChange = useCallback((brand) => {
    const newSelected = !selectedBrands.includes(brand)
      ? [...selectedBrands, brand]
      : selectedBrands.filter(b => b !== brand);
    onBrandChange(newSelected);
  });

  const displayedBrands = showAll ? brands : brands.slice(0, MAX_BRANDS_TO_SHOW);
  const hasMoreBrands = brands.length > MAX_BRANDS_TO_SHOW;

  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom>Brands</Typography>
      <FormGroup>
        {displayedBrands.map((brand) => (
          <BrandCheckbox
            key={brand}
            brand={brand}
            checked={selectedBrands.includes(brand)}
            onToggle={handleChange}
          />
        ))}
      </FormGroup>
      {hasMoreBrands && (
        <Button onClick={() => setShowAll(!showAll)} size="small" sx={{ mt: 1 }}>
          {showAll ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </Box>
  );
})

const display = memo((brands,) => {
  return <>
  {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={handleChange(brand)}
              />
            }
            label={brand}
          />
        ))}
  </>
})

export default BrandFilter