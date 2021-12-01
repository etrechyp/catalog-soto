import DashboardLayout from '../layouts/dashboard';
import AuthContextProvider from '../context/AuthContext';
import { Box } from '@mui/material';
import BrandsCarrousel from '../components/Catalog/BrandsCarrousel';
import Search from '../components/Catalog/Search';
import Products from '../components/Catalog/Products';

export default function CatalogContainer() {
  return (
    <AuthContextProvider>
      <DashboardLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '600px',
              sm: '900px',
              md: '1200px',
            },
            // bgcolor: 'lightblue'
          }}
        >
          <Search />
          <BrandsCarrousel />
          <Products />
        </Box>
      </DashboardLayout>
    </AuthContextProvider>
  );
}
