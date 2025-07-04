import React from 'react';
import { Paper, Box, Typography, Divider } from '@mui/material';
import PriceFilter from './PriceFilter';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import RateFilter from './RateFilter';
import { useCallback } from 'react';
import { memo } from 'react';

const FilterContainer = memo(({
  products,
  categories,
  onFilterChange
}) => {
  // Calculate min and max prices
  const minPrice = React.useMemo(() => {
    return Math.floor(Math.min(...products.map(p => p.price)));
  }, [products]);

  const maxPrice = React.useMemo(() => {
    return Math.ceil(Math.max(...products.map(p => p.price)));
  }, [products]);
  
  const [filters, setFilters] = React.useState({
    priceRange: [minPrice, maxPrice],
    selectedCategories: [],
    selectedBrands: [],
    selectedRate: 0
  });

  // Extract unique brands from products
  const brands = React.useMemo(() => {
    return [...new Set(products.map(product => product.brand).filter(Boolean))];
  }, [products]);


  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(value) => handleFilterChange('priceRange', value)}
        />
        
        <Divider />
        
        <CategoryFilter
          categories={categories}
          selectedCategories={filters.selectedCategories}
          onCategoryChange={(value) => handleFilterChange('selectedCategories', value)}
        />
        
        <Divider />
        
        <BrandFilter
          brands={brands}
          selectedBrands={filters.selectedBrands}
          onBrandChange={React.useCallback(
            (value) => handleFilterChange('selectedBrands', value),
            [filters.selectedBrands]
          )}
        />
        
        <Divider />
        
        <RateFilter
          selectedRate={filters.selectedRate}
          onRateChange={(value) => handleFilterChange('selectedRate', value)}
        />
      </Box>
    </Paper>
  );
})

export default FilterContainer