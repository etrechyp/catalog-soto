import Image from 'next/image';
import { Box } from '@mui/material';
import { MdClose } from 'react-icons/md';
import styles from './styles';

const CompanyLogo = ({ setSidebarOpen }) => (
  <Box sx={styles.logoBox}>
    <Box
      sx={styles.closeButtonWrapper}
      onClick={() => {
        setSidebarOpen(false);
      }}
    >
      <MdClose />
    </Box>
    <Image
      src='/images/new_logo.png'
      alt='company logo'
      width='270px'
      height='70px'
    />
  </Box>
);

export default CompanyLogo;
