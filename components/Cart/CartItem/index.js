import { Paper, Grid, Typography, IconButton } from '@mui/material';
import { FiPlusCircle, FiMinusCircle, FiTrash } from 'react-icons/fi';
import Image from 'next/image';

export default function CartItem({
  product,
  dispatchCart,
  updatePaginationData,
}) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: '0.5rem 0rem',
      }}
    >
      <Grid container direction='row'>
        <Grid
          item
          container
          xs={2}
          md={1}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src={product.mainImage}
            alt='product #1'
            height='100%'
            width='100%'
          />
        </Grid>
        <Grid
          item
          container
          xs={10}
          sm={6}
          md={6}
          sx={{
            flexDirection: 'column',
            paddingLeft: '2rem',
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontSize: 'clamp(1rem, 10vw, 1.5rem)',
            }}
          >
            {product.title}
          </Typography>
          <Paper
            variant='outlined'
            sx={{
              width: 'max-content',
              padding: '0.2rem',
              borderRadius: '10px',
              bgcolor: '#eee',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Typography
              variant='h6'
              fontWeight='light'
              sx={{
                fontSize: 'clamp(0.5rem, 5vw, 1rem)',
              }}
            >
              ${product.price}
            </Typography>
          </Paper>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={3}
          md={2}
          sx={{
            justifyContent: {
              xs: 'center',
              sm: 'space-between',
            },
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <IconButton
            onClick={() =>
              dispatchCart({ type: 'DEC_PRODUCT_QUANTITY', product })
            }
          >
            <FiMinusCircle />
          </IconButton>
          <Typography
            variant='h6'
            sx={{
              fontSize: 'clamp(0.7rem, 7vw, 1.5rem)',
            }}
          >
            {product.numberOfItems}
          </Typography>
          <IconButton
            onClick={() =>
              dispatchCart({ type: 'INC_PRODUCT_QUANTITY', product })
            }
          >
            <FiPlusCircle />
          </IconButton>
        </Grid>
        <Grid
          item
          container
          direction='column'
          xs={12}
          sm={6}
          md={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='h5'
            sx={{
              fontSize: 'clamp(0.7rem, 7vw, 1.5rem)',
            }}
          >
            Total:
          </Typography>
          <Typography
            variant='h6'
            sx={{
              color: 'darkslategray',
              fontSize: 'clamp(0.7rem, 7vw, 1.5rem)',
            }}
          >
            ${(product.price * product.numberOfItems).toFixed(2)}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <IconButton
            onClick={() =>
              dispatchCart({
                type: 'DELETE_PRODUCT',
                product,
                updatePaginationData,
              })
            }
          >
            <FiTrash
              style={{
                color: 'red',
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
