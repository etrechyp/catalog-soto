import { useContext } from 'react';
import DashboardLayout from '../layouts/dashboard';
import { Box } from '@mui/material';
import BrandsCarrousel from '../components/Catalog/BrandsCarrousel';
import Search from '../components/Catalog/Search';
import Products from '../components/Catalog/Products';
import ProductFilters from '../components/Catalog/ProductFilters';
import { LanguageContext } from '../context/LanguageContext';

export default function CatalogContainer() {
  const { languageSelected } = useContext(LanguageContext);

  return (
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
        <Search languageSelected={languageSelected} />
        <BrandsCarrousel languageSelected={languageSelected} />
        <ProductFilters />
        <Products languageSelected={languageSelected} />
      </Box>
    </DashboardLayout>
  );
}
