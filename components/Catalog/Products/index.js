import { Box, Stack, Pagination, Skeleton } from '@mui/material';
import ProductCard from '../ProductCard';
import styles from './styles';
import ProductModal from '../ProductModal';
import useProductsGrid from '../../../hooks/useProductsGrid';

export default function Products() {
  const {
    open,
    handleOpen,
    selectedProduct,
    setSelectedProduct,
    handleClose,
    currentCatalog,
    pages,
    currentPage,
    handlePaginationChange,
    pageSize,
  } = useProductsGrid();

  return (
    <>
      <Stack>
        <Box sx={styles.productsGrid}>
          {currentCatalog.length > 0
            ? currentCatalog
                .slice(pageSize * (currentPage - 1), pageSize * currentPage)
                .map((product, index) => (
                  <ProductCard
                    product={product}
                    key={index}
                    setSelectedProduct={setSelectedProduct}
                    openModal={handleOpen}
                  />
                ))
            : [...Array(10).keys()].map((product, index) => (
                <Skeleton
                  variant='rectangular'
                  key={index}
                  sx={{ width: '100%', height: '200px', borderRadius: '5px' }}
                />
              ))}
        </Box>
        <Pagination
          count={pages}
          page={currentPage}
          sx={styles.productsPagination}
          onChange={handlePaginationChange}
        />
      </Stack>
      {selectedProduct && (
        <ProductModal
          open={open}
          handleClose={handleClose}
          product={selectedProduct}
        />
      )}
    </>
  );
}
