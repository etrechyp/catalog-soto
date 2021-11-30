import {
  Box,
  Stack,
  Pagination,
  Skeleton
} from '@mui/material';
import useModal from '../../../hooks/useModal';
import ProductCard from '../ProductCard';
import styles from './styles';
import props from './props';
import ProductModal from '../ProductModal';

export default function Products() {
  const { open, handleOpen, handleClose } = useModal();
  const products = true;

  return (
    <>
      <Stack>
        <Box sx={styles.productsGrid}>
          {products ? [...Array(10).keys()].map((product, index) => (
            <ProductCard product={product} key={index} openModal={handleOpen} />
          )) : [...Array(10).keys()].map((product, index) => (
             <Skeleton variant="rectangular" key={index} sx={{width: '100%', height: '200px', borderRadius: '5px'}} /> 
          ))}
        </Box>
        <Pagination
          {...props.productsPagination(1, 10)}
          sx={styles.productsPagination}
          // onChange={handleChange}
        />
      </Stack>
      <ProductModal open={open} handleClose={handleClose} />
    </>
  );
}
