import { useState, useContext } from 'react';
import { Button, Typography, Grid, TextField } from '@mui/material';
import { BsCartPlus } from 'react-icons/bs';
import { MdPriceChange } from 'react-icons/md';
import { LanguageContext } from '../../../context/LanguageContext';
import styles from './styles';

export default function ProductDetails() {
  const { languageSelected } = useContext(LanguageContext);
  const [numberOfItemsSelected, setNumberOfItemsSelected] = useState(0);
  const price = 20;
  return (
    <Grid item container md={5} direction='column' sx={styles.productDetails}>
      <Grid item xs={3} sx={styles.productTitle}>
        <Typography variant='h5' textAlign='center'>
          Nintendo Switch w/ Neon Blue & Neon Red Joy-Con + Mario Kart 8{' '}
        </Typography>
      </Grid>
      <Grid item container direction='column' sx={{ p: 1.5 }} spacing={2}>
        <Grid item xs={7}>
          <Typography
            variant='body2'
            textAlign='justify'
            sx={styles.productDescription}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            volutpat efficitur enim, nec congue nisl dapibus vel. Sed imperdiet
            arcu in diam pharetra, ut varius tellus sagittis. Sed elementum elit
            nec placerat venenatis. Pellentesque eu nisi quis tortor tempor
            suscipit eget quis orci. Vestibulum sodales volutpat gravida. Nulla
            ac ex sodales mauris iaculis iaculis sed quis eros. Aenean porttitor
            sed erat accumsan efficitur.
          </Typography>
        </Grid>
        <Grid item container direction='column' xs={2}>
          <Typography variant='h6'>
            <MdPriceChange />
            {languageSelected['UNIT_PRICE']}: $20
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
        <Grid item direction='column'>
          <Button
            variant='outlined'
            color='success'
            sx={{ width: '100%' }}
            endIcon={<BsCartPlus />}
          >
            {languageSelected['ADD_TO_CART']}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
