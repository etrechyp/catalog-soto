import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Pagination,
  Grow,
  Modal,
  Grid,
  TextField,
} from '@mui/material';
import Image from 'next/image';
import useModal from '../../../hooks/useModal';
import { MdPriceChange } from 'react-icons/md';
import { BsCartPlus } from 'react-icons/bs';

export default function Products() {
  const { open, handleOpen, handleClose } = useModal();
  const [numberOfItemsSelected, setNumberOfItemsSelected] = useState(0);
  const price = 20;

  return (
    <>
      <Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '2rem',
            margin: '2rem 0rem',
          }}
        >
          {[...Array(20).keys()].map((item, index) => (
            <Grow in key={index}>
              <Card
                sx={{
                  width: '100%',
                  borderRadius: '15px',
                }}
              >
                <CardActionArea onClick={handleOpen}>
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
          ))}
        </Box>
        <Pagination
          sx={{
            alignSelf: 'center',
            marginBottom: '2rem',
          }}
          count={10}
          page={1}
          // onChange={handleChange}
        />
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: {
              xs: '90vw',
              md: '900px',
            },
            maxWidth: {
              xs: '90vw',
              md: '1100px',
            },
            height: '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            overflowY: 'auto',
            outline: 'none',
          }}
        >
          <Grid container sx={{ minHeight: '100%', width: '100%' }}>
            <Grid
              item
              container
              md={1}
              direction={{
                xs: 'row',
                md: 'column',
              }}
              justifyContent='space-between'
              sx={{
                gap: '1rem',
                maxHeight: '500px',
                width: '100%',
              }}
              order={{
                xs: 0,
                md: 0,
              }}
            >
              {[1, 2, 3, 4, 5].map((item, index) => (
                <Grid
                  item
                  container
                  key={index}
                  sx={{
                    flex: 1,
                    border: '0.5px solid gray',
                    borderRadius: '5px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ':hover': {
                      cursor: 'pointer',
                      boxShadow: 2,
                    },
                  }}
                >
                  <Image
                    src='/images/drsana.jpg'
                    width='100%'
                    height='100%'
                    objectFit='cover'
                    alt={index}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              container
              md={6}
              direction='column'
              justifyContent='center'
              alignItems='center'
              order={{
                xs: -1,
                md: 0,
              }}
            >
              <Grid
                item
                sx={{
                  width: {
                    xs: '60%',
                    md: '100%',
                  },
                }}
              >
                <Image
                  src='/images/drsana.jpg'
                  width='100%'
                  height='100%'
                  layout='responsive'
                  alt='Product view #1'
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              md={4}
              direction='column'
              sx={{
                height: 'max-content',
                gap: 2,
              }}
            >
              <Grid item xs={3}>
                <Typography variant='h5' textAlign='center'>
                  Nintendo Switch w/ Neon Blue & Neon Red Joy-Con + Mario Kart 8{' '}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant='body1' textAlign='justify'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean volutpat efficitur enim, nec congue nisl dapibus vel.
                  Sed imperdiet arcu in diam pharetra, ut varius tellus
                  sagittis. Sed elementum elit nec placerat venenatis.
                  Pellentesque eu nisi quis tortor tempor suscipit eget quis
                  orci. Vestibulum sodales volutpat gravida. Nulla ac ex sodales
                  mauris iaculis iaculis sed quis eros. Aenean porttitor sed
                  erat accumsan efficitur.
                </Typography>
              </Grid>
              <Grid item container direction='column' xs={2}>
                <Typography variant='h6'>
                  <MdPriceChange />
                  Precio unitario: $20
                </Typography>
              </Grid>
              <Grid item container direction='column' xs={2}>
                <TextField
                  type='number'
                  placeholder='Nro de unidades'
                  value={numberOfItemsSelected}
                  onChange={(e) => {
                    setNumberOfItemsSelected(e.target.value);
                  }}
                  inputProps={{
                    min: 1,
                  }}
                />
              </Grid>
              <Grid item container direction='column' xs={2}>
                <TextField
                  type='text'
                  disabled
                  placeholder='Total'
                  value={`$${numberOfItemsSelected * price}`}
                />
              </Grid>
              <Button variant='outlined' color="success" endIcon={<BsCartPlus />}>
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
