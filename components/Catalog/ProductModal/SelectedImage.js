import { Grid, Skeleton } from '@mui/material';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import styles from './styles';

export default function SelectedImage({ loading, image }) {
  return (
    <Grid item container md={6} sx={styles.productImageContainer}>
      <Grid item sx={styles.productImageBox}>
        {!loading ? (
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
          >
            <TransformComponent>
              <img
                loading='lazy'
                src={image}
                width='100%'
                height='100%'
                alt='Product view #1'
              />
            </TransformComponent>
          </TransformWrapper>
        ) : (
          <Skeleton variant='rectangular' width='100%' height='100%' />
        )}
      </Grid>
    </Grid>
  );
}
