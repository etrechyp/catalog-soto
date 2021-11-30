import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Grow,
} from '@mui/material';

export default function ProductCard({ product, openModal }) {
  return (
    <Grow in>
      <Card
        sx={{
          width: '100%',
          borderRadius: '15px',
        }}
      >
        <CardActionArea onClick={openModal}>
          <CardMedia
            component='img'
            height='200'
            image='https://cdn.shopify.com/s/files/1/0281/5665/7739/products/649f6865-9a6c-4a48-bf7c-6a1e44518f31_f84b45fd-ec39-408f-a022-ed33f92e2c5d_360x.jpg?v=1605806508'
            alt='Dr sana'
          />
          <CardContent>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              Dr sana
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
}
