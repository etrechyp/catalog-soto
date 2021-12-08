import { Box, Modal, Grid } from '@mui/material';
import ProductImagesSelector from './ProductImagesSelector';
import SelectedImage from './SelectedImage';
import styles from './styles';
import ProductDetails from './ProductDetails';

export default function ProductModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styles.modalBox}>
        <Grid
          container
          sx={{
            minHeight: '100%',
            width: '100%',
            margin: '0rem',
            padding: '0rem 1rem',
          }}
        >
          <ProductImagesSelector />
          <SelectedImage />
          <ProductDetails />
        </Grid>
      </Box>
    </Modal>
  );
}
