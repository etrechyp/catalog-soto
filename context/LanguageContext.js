import { createContext, useReducer } from 'react';
import english_locale from '../locales/en';
import spanish_locale from '../locales/es';
import { useRouter } from 'next/router';


export const LanguageContext = createContext();

const languageReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      const newLanguage =
        action.locale === 'en-US' ? english_locale : spanish_locale;

      localStorage.setItem(
        'userDefaultLanguage',
        JSON.stringify({
          language: newLanguage,
        })
      );

      return { ...newLanguage };
  }

  return state;
};

const LanguageContextProvider = ({ children }) => {
  const { locale } = useRouter();
  const language = locale === 'en-US' ? english_locale : spanish_locale;
  const [languageSelected, dispatchLanguage] = useReducer(
    languageReducer,
    language
  );

  return (
    <LanguageContext.Provider value={{ languageSelected, dispatchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
