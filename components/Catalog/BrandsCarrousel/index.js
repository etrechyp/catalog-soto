import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { Box, Paper, Skeleton, Typography } from '@mui/material';
import Carousel from 'react-elastic-carousel';
import { CatalogContext } from '../../../context/CatalogContext';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 601, itemsToShow: 2 },
  { width: 901, itemsToShow: 3 },
  { width: 1201, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1537, itemsToShow: 5 },
];

export default function BrandsCarrousel({ languageSelected }) {
  const { catalogState, dispatchCatalog } = useContext(CatalogContext);
  const [brands, setBrands] = useState({
    loading: true,
    items: [],
  });

  const getAllBrands = async () => {
    try {
      const response = await fetch(
        'http://192.168.88.2:8082/api/products/brands'
      );
      const data = await response.json();

      setBrands({
        loading: false,
        items: data,
      });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const Carrouseltems = !brands.loading
    ? brands.items.map((item) => {
        return (
          <Paper
            key={item.brandId}
            variant='outlined'
            onClick={() =>
              dispatchCatalog({
                type: 'APPLY_FILTERS',
                search: catalogState.filters.search,
                brand: item.Key,
              })
            }
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              flexBasis: '90%',
              ':hover': {
                cursor: 'pointer',
                bgcolor: '#fff',
              },
            }}
          >
            <Image
              height='150px'
              width='300px'
              src={`http://192.168.88.2:8082/images/brands/${item.Key}.png`}
              alt='brand'
            />
          </Paper>
        );
      })
    : [...Array(5).keys()].map((product, index) => (
        <Skeleton
          variant='rectangular'
          key={index}
          sx={{ flexBasis: '90%', height: '150px', borderRadius: '5px' }}
        />
      ));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          margin: '2rem',
          textTransform: 'uppercase',
        }}
      >
        {languageSelected['SEARCH_PRODUCT_BY_BRAND']}
      </Typography>

      <Box
        sx={{
          width: '100%',
        }}
      >
        {/*Carrousel Body*/}
        <Carousel breakPoints={breakPoints}>{Carrouseltems}</Carousel>
      </Box>
    </Box>
  );
}
