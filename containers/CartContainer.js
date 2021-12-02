import { useContext } from 'react';
import DashboardLayout from '../layouts/dashboard';
import AuthContextProvider from '../context/AuthContext';
import { Box, Grid, IconButton, Pagination, Tooltip } from '@mui/material';
import CartItems from '../components/Cart/CartItems';
import { FiDownload, FiTrash } from 'react-icons/fi';
import { LanguageContext } from '../context/LanguageContext';

const TotalPriceBox = ({languageSelected}) => (
  <Grid
    container
    justifyContent='center'
    alignItems='center'
    sx={{
      position: 'fixed',
      bgcolor: '#8FBC8F',
      color: 'white',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3rem',
    }}
  >
    {languageSelected["TOTAL_CART"]}: $20000
  </Grid>
);

export default function CartContainer() {
  const { languageSelected } = useContext(LanguageContext);

  return (
    <AuthContextProvider>
      <DashboardLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '600px',
              sm: '900px',
            },
            // bgcolor: 'lightblue'
          }}
        >
          <Grid
            container
            sx={{
              width: '100%',
              margin: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              container
              justifyContent='center'
              alignItems='center'
              xs={12}
              md={2}
            >
              <Tooltip title={languageSelected['DOWNLOAD_CART_DATA']}>
                <IconButton>
                  <FiDownload style={{ color: 'green' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={languageSelected['DELETE_ALL_FROM_CART']}>
                <IconButton>
                  <FiTrash style={{ color: 'red' }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid
              xs={12}
              md={4}
              item
              container
              justifyContent='center'
              alignItems='center'
            >
              <Pagination count={5} variant='outlined' />
            </Grid>
          </Grid>
          <CartItems />
        </Box>
        <TotalPriceBox languageSelected={languageSelected}/>
      </DashboardLayout>
    </AuthContextProvider>
  );
}
