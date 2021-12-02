import '../styles/globals.css';
import LanguageContextProvider from '../context/LanguageContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageContextProvider>
      <Component {...pageProps} />
    </LanguageContextProvider>
  );
}

export default MyApp;