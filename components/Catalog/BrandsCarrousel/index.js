import { useState } from 'react';
import Image from 'next/image';
import { Box, Paper, IconButton } from '@mui/material';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export default function BrandsCarrousel() {
  const [level, setLevel] = useState(0);

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
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'hidden',
            justifyContent: 'space-between',
          }}
        >
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
              minHeight: '8rem',
              bgcolor: 'lightblue',
              padding: '2rem',
              flexBasis: '32%',
            }}
          >
            <Image height={150} width={300} src='/logos/KRIP.png' alt='brand' />
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
              minHeight: '8rem',
              bgcolor: 'lightpink',
              padding: '2rem',
              flexBasis: '32%',
            }}
          >
            <Image
              height={150}
              width={300}
              src='/logos/logo-valmy.png'
              alt='brand'
            />
          </Paper>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
              minHeight: '8rem',
              bgcolor: 'lightseagreen',
              padding: '2rem',
              flexBasis: '32%',
            }}
          >
            <Image height={150} width={300} src='/logos/KRIP.png' alt='brand' />
          </Paper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1.5rem',
          }}
        >
          <IconButton sx={{ border: '0.5px solid black' }}>
            <MdNavigateBefore />
          </IconButton>
          <IconButton sx={{ border: '0.5px solid black' }}>
            <MdNavigateNext />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
