import { Grid } from '@mui/material';
import Image from 'next/image';
import styles from "./styles";

export default function ProductImagesSelector() {
  return (
    <Grid item container md={1} sx={styles.productImagesWrapper}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <Grid item container key={index} sx={styles.productImageThumbnail}>
          <Image
            src='/images/drsana.jpg'
            width='100%'
            height='100%'
            objectFit='cover'
            alt={index}
          />
        </Grid>
      ))}
    </Grid>
  );
}
