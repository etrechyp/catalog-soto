import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Grow,
} from '@mui/material';

export default function ProductCard({
  product,
  setSelectedProduct,
  openModal,
}) {
  const { ImageUrl: productImage, eBayTopTitle } = product;
  const handleClick = () => {
    setSelectedProduct(product);
    openModal();
  };

  return (
    <Grow in>
      <Card
        sx={{
          width: '100%',
          borderRadius: '15px',
        }}
      >
        <CardActionArea
          sx={{ width: '100%', height: '100%' }}
          onClick={handleClick}
        >
          <CardMedia
            component='img'
            height='200'
            image={productImage}
            alt={eBayTopTitle}
          />
          <CardContent>
            <Typography
              variant='h6'
              fontWeight='light'
              sx={{ textAlign: 'center' }}
            >
              {eBayTopTitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
}
