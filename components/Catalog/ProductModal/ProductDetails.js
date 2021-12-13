import { useState, useContext } from 'react';
import { Button, Typography, Grid, TextField } from '@mui/material';
import { BsCartPlus } from 'react-icons/bs';
import { MdPriceChange } from 'react-icons/md';
import { LanguageContext } from '../../../context/LanguageContext';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';
import styles from './styles';

export default function ProductDetails({ product }) {
  const { languageSelected } = useContext(LanguageContext);
  const { dispatchCart } = useContext(CartContext);
  const { userData } = useContext(AuthContext);
  const [numberOfItemsSelected, setNumberOfItemsSelected] = useState(0);
  const price =
    userData.businessStyle === 'Wholesaler' ? product.WholeSalePrice : 0;

  return (
    <Grid item container md={5} direction='column' sx={styles.productDetails}>
      <Grid item xs={3} sx={styles.productTitle}>
        <Typography variant='h5' textAlign='center'>
          {product.eBayTopTitle}
        </Typography>
      </Grid>
      <Grid item container direction='column' sx={{ p: 1.5 }} spacing={2}>
        <Grid item xs={7}>
          <Typography
            variant='body2'
            textAlign='justify'
            sx={styles.productDescription}
          >
            {product.ShortDescription}
          </Typography>
        </Grid>
        <Grid item container direction='column' xs={2}>
          <Typography variant='h6'>
            <MdPriceChange />
            {languageSelected['UNIT_PRICE']}: ${price}
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
              max: product.AggregatePhysicalQty,
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
            onClick={() => {
              dispatchCart({
                type: 'ADD_PRODUCT',
                product: {
                  ID: product.ID,
                  title: product.eBayTopTitle,
                  price,
                  mainImage: product.ImageUrl,
                  numberOfItems: Number(numberOfItemsSelected),
                },
              });
            }}
          >
            {languageSelected['ADD_TO_CART']}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
