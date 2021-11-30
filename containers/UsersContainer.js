import CatalogLayout from '../layouts/catalog';
import AuthContextProvider from '../context/AuthContext';

export default function UsersContainer() {
  return (
    <AuthContextProvider>
      <CatalogLayout>
      </CatalogLayout>
    </AuthContextProvider>
  );
}
