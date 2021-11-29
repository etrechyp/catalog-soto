import Link from 'next/link';
import { Box } from '@mui/material';
import styles from './styles';

const MenuItem = ({ item, currentRoute }) => {
  return (
    <Link passHref href={item.url}>
      <Box sx={styles.pageLink(currentRoute, item.url)}>
        <Box sx={styles.pageLinkIcon}>{item.Icon}</Box>
        <Box>{item.title}</Box>
      </Box>
    </Link>
  );
};

export default MenuItem;
