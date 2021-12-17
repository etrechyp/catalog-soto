import { useContext, useRef, useEffect, useState } from 'react';
import DashboardLayout from '../layouts/dashboard';
import { CartContext } from '../context/CartContext';
import { CatalogContext } from '../context/CatalogContext';
import usePagination from '../hooks/usePagination';
import CartItem from '../components/Cart/CartItem';
import Link from 'next/link';
import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Tooltip,
  Typography,
} from '@mui/material';
import { FiDownload, FiTrash } from 'react-icons/fi';
import { LanguageContext } from '../context/LanguageContext';

const TotalPriceBox = ({ languageSelected, totalCost }) => (
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
    {languageSelected['TOTAL_CART']}: {totalCost}
  </Grid>
);

export default function CartContainer() {
  const { languageSelected } = useContext(LanguageContext);
  const { cartData, dispatchCart } = useContext(CartContext);
  const { catalogState } = useContext(CatalogContext);
  const { pagination, pageSize, handlePaginationChange, updatePaginationData } =
    usePagination(cartData.items);
  const { pages, currentPage } = pagination;
  const linkRef = useRef(null);
  const [downloadLink, setDownloadLink] = useState({
    active: false,
    url: '',
  });

  const downloadCartData = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const requestBody = {
      lastUpdated: catalogState.lastUpdated,
      products: cartData.items,
      total: cartData.total,
    };

    let response = await fetch('http://192.168.88.2:8082/api/report', {
      method: 'POST',
      headers: {
        token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    let { filename } = await response.json();

    setDownloadLink(() => ({
      active: true,
      url: `http://192.168.88.2:8082/api/report/${filename}`,
    }));
  };

  useEffect(() => {
    if (downloadLink.active) {
      linkRef.current.click();
      setDownloadLink({
        active: false,
        url: '',
      });
    }
  }, [downloadLink.active]);

  return (
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
              <IconButton onClick={downloadCartData}>
                <FiDownload style={{ color: 'green' }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={languageSelected['DELETE_ALL_FROM_CART']}
              onClick={() => {
                dispatchCart({
                  type: 'DELETE_ALL',
                  updatePaginationData,
                });
              }}
            >
              <IconButton>
                <FiTrash style={{ color: 'red' }} />
              </IconButton>
            </Tooltip>
            {downloadLink.active && (
              <a href={downloadLink.url} download ref={linkRef}></a>
            )}
          </Grid>
          <Grid
            xs={12}
            md={4}
            item
            container
            justifyContent='center'
            alignItems='center'
          >
            <Pagination
              count={pages}
              page={currentPage}
              onChange={handlePaginationChange}
              variant='outlined'
            />
          </Grid>
        </Grid>
        {cartData.items.length > 0 ? (
          cartData.items
            .slice(pageSize * (currentPage - 1), pageSize * currentPage)
            .map((cartItem) => {
              return (
                <CartItem
                  product={cartItem}
                  key={cartItem.ID}
                  dispatchCart={dispatchCart}
                  updatePaginationData={updatePaginationData}
                />
              );
            })
        ) : (
          <Typography
            variant='body1'
            sx={{ width: '100%', textAlign: 'center' }}
          >
            {languageSelected['NO_PRODUCTS_IN_CART']}
          </Typography>
        )}
      </Box>
      <TotalPriceBox
        languageSelected={languageSelected}
        totalCost={`$${cartData.total.toFixed(2)}`}
      />
    </DashboardLayout>
  );
}
