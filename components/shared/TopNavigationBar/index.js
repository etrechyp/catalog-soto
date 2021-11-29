import * as React from 'react';
import { AppBar, Toolbar, Box, Badge, IconButton } from '@mui/material';
import { IoMenuOutline } from 'react-icons/io5';
import { IoCart } from 'react-icons/io5';
import Link from 'next/link';
import styles from './styles';

export default function TopNavigationBar({ setSidebarOpen }) {
  const openSidebar = () => setSidebarOpen(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={styles.navbarBox}>
        <Toolbar sx={styles.navbarBoxFlexWrapper}>
          <Link href='/cart' passHref>
            <a>
              <Badge badgeContent={10} color='primary' sx={styles.badge}>
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
