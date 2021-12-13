import { createContext, useReducer } from 'react';

const authData = {
  loggedIn: false,
  email: '',
  firstName: '',
  lastName: '',
  isAdmin: false,
  sellerCloudTokenData: null,
  businessStyle: '',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('userData', JSON.stringify(action.user));
      localStorage.setItem('token', JSON.stringify(action.token));

      return {
        loggedIn: true,
        email: action.user.email,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        isAdmin: action.user.isAdmin,
        sellerCloudTokenData: null,
        businessStyle: action.user.businessStyle,
      };
    case 'LOGOUT':
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      localStorage.removeItem('sellerCloudDataToken');

      return {
        loggedIn: false,
        email: '',
        firstName: '',
        lastName: '',
        isAdmin: false,
        sellerCloudTokenData: null,
        businessStyle: '',
      };
    case 'SELLERCLOUD_REQUEST_TOKEN':
      const { access_token, expires, issued } = action.tokenData;

      localStorage.setItem(
        'sellerCloudDataToken',
        JSON.stringify(action.tokenData)
      );

      return {
        ...state,
        sellerCloudTokenData: { access_token, expires, issued },
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userData, dispatchAuth] = useReducer(
    authReducer,
    authData,
    (authObject) => {
      const ISSERVER = typeof window === 'undefined';

      if (!ISSERVER) {
        let storedSession = localStorage.getItem('userData');
        let sellerCloudTokenData = localStorage.getItem('sellerCloudDataToken');
        if (storedSession) {
          storedSession = JSON.parse(storedSession);
          sellerCloudTokenData = JSON.parse(sellerCloudTokenData);

          return {
            loggedIn: true,
            email: storedSession.email,
            firstName: storedSession.firstName,
            lastName: storedSession.lastName,
            isAdmin: storedSession.isAdmin,
            sellerCloudTokenData,
            businessStyle: storedSession.businessStyle,
          };
        }

        return authObject;
      }
    }
  );

  return (
    <AuthContext.Provider value={{ userData, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
