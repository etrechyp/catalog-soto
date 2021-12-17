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
  let price;

  //Todo - Cuando el localStorePrice este disponible cambiar la linea 15 por la de abajo
  switch (userData.businessStyle) {
    case 'Wholesaler':
      price = product.WholeSalePrice;
      break;
    case 'Store':
      price = product.SitePrice;
      break;
    default:
      price = 9999;
  }

  const itemInCart = cartData.items.find(
    (cartProduct) => cartProduct.ID === product.ID
  );

  //PORSIACASO
  // const itemsAvailable = itemInCart
  //   ? product.AggregatePhysicalQty - itemInCart.numberOfItems
  //   : product.AggregatePhysicalQty;

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
            {userData.businessStyle === 'Wholesaler'
              ? `${languageSelected['WHOLESALER_PRICE']}: $${price}`
              : `${languageSelected['UNIT_PRICE']}: $${price}`}
          </Typography>
        </Grid>
        <Grid item container direction='column' xs={2}>
          <TextField
            type='number'
            placeholder={languageSelected['NUMBER_OF_ITEMS']}
            value={numberOfItemsSelected}
            onChange={(e) => setNumberOfItemsSelected(e.target.value)}
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
            value={`${
              numberOfItemsSelected >= 0
                ? '$' + (numberOfItemsSelected * price).toFixed(2)
                : languageSelected['INVALID_QUANTITY']
            }`}
          />
        </Grid>
        <Grid item direction='column'>
          <Button
            variant='outlined'
            color='success'
            sx={{ width: '100%' }}
            endIcon={<BsCartPlus />}
            onClick={() => {
              if (
                numberOfItemsSelected > 0 &&
                typeof Number(numberOfItemsSelected) === 'number'
              ) {
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
                setSnackbar({
                  open: true,
                  severity: 'success',
                  message: languageSelected['ADDED_TO_CART'],
                });
              } else {
                setSnackbar({
                  open: true,
                  severity: 'error',
                  message: languageSelected['INVALID_QUANTITY'],
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
