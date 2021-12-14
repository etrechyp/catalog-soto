import '../styles/globals.css';
import LanguageContextProvider from '../context/LanguageContext';
import AuthContextProvider from '../context/AuthContext';
import CartContextProvider from '../context/CartContext';
import CatalogContextProvider from '../context/CatalogContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageContextProvider>
      <AuthContextProvider>
        <CatalogContextProvider>
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </CatalogContextProvider>
      </AuthContextProvider>
    </LanguageContextProvider>
  );
}

export default MyApp;
