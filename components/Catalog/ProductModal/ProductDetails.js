import { useState, useContext } from 'react';
import { Button, Typography, Grid, TextField } from '@mui/material';
import { BsCartPlus } from 'react-icons/bs';
import { MdPriceChange } from 'react-icons/md';
import { LanguageContext } from '../../../context/LanguageContext';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';
import styles from './styles';

export default function ProductDetails({ product, setSnackbar }) {
  const { languageSelected } = useContext(LanguageContext);
  const { cartData, dispatchCart } = useContext(CartContext);
  const { userData } = useContext(AuthContext);
  const [numberOfItemsSelected, setNumberOfItemsSelected] = useState(0);
  const price =
    userData.businessStyle === 'Wholesaler' ? product.WholeSalePrice : 0;

  const itemInCart = cartData.items.find(
    (cartProduct) => cartProduct.ID === product.ID
  );

  const itemsAvailable = itemInCart
    ? product.AggregatePhysicalQty - itemInCart.numberOfItems
    : product.AggregatePhysicalQty;

  console.log('Item in cart', itemInCart);

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
            placeholder={languageSelected['NUMBER_OF_ITEMS']}
            value={numberOfItemsSelected}
            onChange={(e) => {
              console.log(e.target.value, itemsAvailable)
              if (e.target.value <= itemsAvailable) {
                setNumberOfItemsSelected(e.target.value);
              } else {
                setSnackbar({
                  open: true,
                  severity: 'error',
                  message:
                    languageSelected['EXCEEDED_PRODUCT_LIMIT'](itemsAvailable),
                });
              }
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
            value={`$${(numberOfItemsSelected * price).toFixed(2)}`}
          />
        </Grid>
        <Grid item direction='column'>
          <Button
            variant='outlined'
            color='success'
            sx={{ width: '100%' }}
            endIcon={<BsCartPlus />}
            onClick={() => {
              if (numberOfItemsSelected <= itemsAvailable) {
                dispatchCart({
                  type: 'ADD_PRODUCT',
                  product: {
                    ID: product.ID,
                    title: product.eBayTopTitle,
                    price,
                    mainImage: product.ImageUrl,
                    numberOfItems: Number(numberOfItemsSelected),
                    maxItems: product['AggregatePhysicalQty'],
                  },
                });
                setSnackbar({
                  open: true,
                  severity: 'success',
                  message: languageSelected['ADDED_TO_CART'],
                });
              } else {
                setSnackbar({
                  open: true,
                  severity: 'error',
                  message:
                    languageSelected['EXCEEDED_PRODUCT_LIMIT'](itemsAvailable),
                });
              }
            }}
          >
            {languageSelected['ADD_TO_CART']}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
