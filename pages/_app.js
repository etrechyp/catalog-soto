import '../styles/globals.css';
import LanguageContextProvider from '../context/LanguageContext';
import AuthContextProvider from '../context/AuthContext';
import CartContextProvider from '../context/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </AuthContextProvider>
    </LanguageContextProvider>
  );
}

export default MyApp;
