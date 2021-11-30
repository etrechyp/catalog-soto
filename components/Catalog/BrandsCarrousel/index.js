import Image from 'next/image';
import { Box, Paper, Skeleton } from '@mui/material';
import Carousel from 'react-elastic-carousel';

export default function BrandsCarrousel() {
  const brands = true;
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 601, itemsToShow: 2 },
    { width: 901, itemsToShow: 3 },
    { width: 1201, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1537, itemsToShow: 5 },
  ];
  const items = [
    {
      brand: 'KRIP',
      logo: '/logos/KRIP.png',
      brandId: 1,
    },
    {
      brand: 'Valmy',
      logo: '/logos/logo-valmy.png',
      brandId: 2,
    },
    {
      brand: 'Avon',
      logo: '/logos/avon-logo.png',
      brandId: 3,
    },
    {
      brand: 'Aromar',
      logo: '/logos/aromar-logo.png',
      brandId: 4,
    },
    {
      brand: 'DOVE',
      logo: '/logos/DOVE.png',
      brandId: 5,
    },
  ];

  const colors = [
    '#ADD8E6',
    '#FFB6C1',
    '#20B2AA',
    '#87CEFA',
    '#B0C4DE',
    '#e91e63',
    '#8bc34a',
    '#3f51b5',
    '#1de9b6',
  ];

  const lightenDarkenColor = (col, amt) => {
    var usePound = false;

    if (col[0] == '#') {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const Carrouseltems = brands
    ? items.map((item) => {
        const cardColor = colors[randomIntFromInterval(0, colors.length - 1)];

        return (
          <Paper
            key={item.brandId}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              bgcolor: cardColor,
              padding: '2rem',
              flexBasis: '90%',
              ':hover': {
                cursor: 'pointer',
                bgcolor: lightenDarkenColor(cardColor, -20),
              },
            }}
          >
            <Image height={150} width={300} src={item.logo} alt='brand' />
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
      <h4>Ver productos por marca:</h4>

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
