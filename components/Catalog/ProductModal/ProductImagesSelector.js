import { Grid, Skeleton } from '@mui/material';
import Image from 'next/image';
import styles from './styles';

export default function ProductImagesSelector({ loading, images, setSelectedImage }) {

  return (
    <Grid item container md={1} sx={styles.productImagesWrapper}>
      {!loading
        ? images.map((item, index) => {
            return (
              <Grid
                item
                container
                key={index}
                sx={styles.productImageThumbnail}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={item.Url}
                  width='100%'
                  height='100%'
                  objectFit='cover'
                  alt={index}
                />
              </Grid>
            );
          })
        : [1, 2, 3, 4, 5].map((item, index) => (
            <Grid item container key={index} sx={styles.productImageThumbnail}>
              <Skeleton variant='rectangular' width='100%' height='100%' />
            </Grid>
          ))}
    </Grid>
  );
}
