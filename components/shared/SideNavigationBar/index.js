import Portal from '../Portal';
import { useContext } from 'react';
import { Box, Stack, Typography, Slide } from '@mui/material';
import styles from './styles';
import links from './placeholderData';
import MenuItem from './MenuItem';
import CompanyLogo from './CompanyLogo';
import { IoLogOutOutline } from 'react-icons/io5';
import { AuthContext } from '../../../context/AuthContext';
import { useRouter } from 'next/router';



export default function SideNavigationBar({ sideBarOpen, setSidebarOpen }) {
  const { userData, dispatchAuth } = useContext(AuthContext);
  const router = useRouter();

  const handleLogOut = () => {
    dispatchAuth({
      type: 'LOGOUT',
    });
    router.push('/');
  };

  return (
    <Portal name='side-navbar'>
      <Slide direction="right" in={sideBarOpen} mountOnEnter unmountOnExit>
      <Box sx={styles.navigationBarBox(sideBarOpen)}>
        <Stack sx={styles.navigationBarWrapper}>
          <CompanyLogo setSidebarOpen={setSidebarOpen} />
          <Box sx={styles.sidebarBodyWrapper}>
            <Stack>
              {links.map((link) => (
                <MenuItem
                  item={link}
                  currentRoute={router.pathname}
                  key={link.id}
                />
              ))}
            </Stack>
            <Stack>
              <Stack sx={styles.userBox}>
                <Box>
                  <Typography variant='h4'>{userData && userData.name}</Typography>
                  <Typography variant='h6'>{userData && userData.email}</Typography>
                </Box>
                <Box
                  sx={styles.logOutButton}
                  onClick={handleLogOut}
                >
                  <IoLogOutOutline />
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
      </Slide>
    </Portal>
  );
}