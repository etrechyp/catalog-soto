import { Modal, Box, Grid } from '@mui/material';
import ProductImagesSelector from './ProductImagesSelector';
import SelectedImage from './SelectedImage';
import styles from './styles';
import ProductDetails from './ProductDetails';
import useProductImages from '../../../hooks/useProductImages';

export default function ProductModal({ open, handleClose, product }) {
  const {
    ID: productId,
    eBayTopTitle,
    ShortDescription,
    ImageUrl: defaultImage,
    WholeSalePrice,
  } = product;
  const {
    images,
    changeSelectedImage
  } = useProductImages(productId, defaultImage);

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
          <ProductImagesSelector
            loading={images.loading}
            images={images.data}
            setSelectedImage={changeSelectedImage}
          />
          <SelectedImage
            loading={images.loading}
            image={images.selectedImage}
          />
          <ProductDetails
            productTitle={eBayTopTitle}
            ShortDescription={ShortDescription}
            WholeSalePrice={WholeSalePrice}
            loading={images.loading}
          />
        </Grid>
      </Box>
    </Modal>
  );
}
