import { useContext} from 'react';
import { AppBar, Toolbar, Box, Badge, IconButton } from '@mui/material';
import { CartContext } from "../../../context/CartContext";
import { IoMenuOutline } from 'react-icons/io5';
import { IoCart } from 'react-icons/io5';
import SelectLanguage from "../SelectLanguage";
import Link from 'next/link';
import styles from './styles';

export default function TopNavigationBar({ setSidebarOpen }) {
  const { cartData } = useContext(CartContext);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={styles.navbarBox}>
        <Toolbar sx={styles.navbarBoxFlexWrapper}>
          <SelectLanguage />
          <Link href='/cart' passHref>
            <a>
              <Badge badgeContent={cartData.items.length} color='primary' sx={styles.badge}>
                <IoCart />
              </Badge>
            </a>
          </Link>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={openSidebar}
          >
            <IoMenuOutline />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
