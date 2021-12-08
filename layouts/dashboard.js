import { useContext } from 'react';
import { useState, useEffect } from 'react';
import SideNavigationBar from '../components/shared/SideNavigationBar';
import TopNavigationBar from '../components/shared/TopNavigationBar';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { LanguageContext } from '../context/LanguageContext';

export default function DashboardLayout({ children }) {
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const { languageSelected } = useContext(LanguageContext);
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      router.push('/');
    }

    if(router.pathname === "/users" && userData && !userData.isAdmin){
      router.push("/catalog");
    }
  }, []);

  return (
    <>
      <TopNavigationBar
        setSidebarOpen={setSidebarOpen}
        languageSelected={languageSelected}
      />
      <SideNavigationBar
        sideBarOpen={sideBarOpen}
        setSidebarOpen={setSidebarOpen}
        languageSelected={languageSelected}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: 'calc(100vh - 4rem)',
          justifyContent: 'center',
          position: 'absolute',
          padding: '1rem',
          marginTop: '8rem',
        }}
      >
        {children}
      </Box>
    </>
  );
}
