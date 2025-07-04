import React, { useCallback, useMemo } from 'react'
import { ProductItem } from './ProductItem'
import FilterContainer from './filters/FilterContainer'
import SortFilter from './filters/SortFilter'
import { Box, Pagination, Stack } from '@mui/material'
import { useSelector } from 'react-redux'

export default function ProductGrid() {
  const { products } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.categories)
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [sortBy, setSortBy] = React.useState('default');
  const [page, setPage] = React.useState(1);
  const productsPerPage = 20;

  const handleFilterChange = useCallback((filters) => {
    let filtered = [...products];

    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply category filter
    if (filters.selectedCategories.length > 0) {
      filtered = filtered.filter(
        product => filters.selectedCategories.includes(product.categoryId)
      );
    }

    // Apply brand filter
    if (filters.selectedBrands.length > 0) {
      filtered = filtered.filter(
        product => filters.selectedBrands.includes(product.brand)
      );
    }

    // Apply rating filter
    if (filters.selectedRate > 0) {
      filtered = filtered.filter(
        product => (product.rate || 0) >= filters.selectedRate
      );
    }

    setFilteredProducts(filtered);
    setPage(1); // Reset to first page when filters change
  }, [products]);

  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    setPage(1); // Reset to first page when sort changes
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price_asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rate_asc':
        return sorted.sort((a, b) => (a.rate || 0) - (b.rate || 0));
      case 'rate_desc':
        return sorted.sort((a, b) => (b.rate || 0) - (a.rate || 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * productsPerPage;
    return sortedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [sortedProducts, page]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Box sx={{ width: 300, flexShrink: 0 }}>
        <FilterContainer
          products={products}
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SortFilter sortBy={sortBy} onSortChange={handleSortChange} />
          </Box>
          
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
            {paginatedProducts.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
