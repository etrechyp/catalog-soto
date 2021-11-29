import { useState, useEffect } from 'react';
import SideNavigationBar from '../components/shared/SideNavigationBar';
import TopNavigationBar from '../components/shared/TopNavigationBar';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function CatalogLayout({ children }) {
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('userData')) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <TopNavigationBar setSidebarOpen={setSidebarOpen} />
      <SideNavigationBar
        sideBarOpen={sideBarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: 'calc(100vh - 4rem)',
          justifyContent: 'center',
          position: 'absolute',
          padding: '1rem',
          marginTop: '8rem'
        }}
      >
        {children}
      </Box>
    </>
  );
}
