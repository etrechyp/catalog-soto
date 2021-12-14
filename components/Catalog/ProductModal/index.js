import { Modal, Box, Grid } from '@mui/material';
import ProductImagesSelector from './ProductImagesSelector';
import SelectedImage from './SelectedImage';
import styles from './styles';
import ProductDetails from './ProductDetails';
import useProductImages from '../../../hooks/useProductImages';
import useSnackbar from '../../../hooks/useSnackbar';
import CustomizedSnackbars from '../../shared/CustomSnackbars';

export default function ProductModal({ open, handleClose, product }) {
  const { ID: productId, ImageUrl: defaultImage } = product;
  const { images, changeSelectedImage } = useProductImages(
    productId,
    defaultImage
  );
  const { snackbar, setSnackbar, handleOpenCloseSnackbar } = useSnackbar();

  return (
    <>
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
            <ProductImagesSelector
              loading={images.loading}
              images={images.data}
              setSelectedImage={changeSelectedImage}
            />
            <SelectedImage
              loading={images.loading}
              image={images.selectedImage}
            />
            <ProductDetails product={product} setSnackbar={setSnackbar} />
          </Grid>
        </Box>
      </Modal>
      <CustomizedSnackbars
        snackbarDuration={8000}
        openSnackbar={snackbar.open}
        handleCloseSnackbar={() => handleOpenCloseSnackbar('CLOSE')}
        severity={snackbar.severity}
        snackbarMessage={snackbar.message}
      />
    </>
  );
}
