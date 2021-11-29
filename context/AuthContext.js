import { createContext, useReducer } from 'react';

const authData = {
  loggedIn: false,
  email: '',
  name: '',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('userData', JSON.stringify(action.user));
      localStorage.setItem('token', JSON.stringify(action.token));

      return {
        loggedIn: true,
        email: action.user.email,
        name: action.user.name,
      };
    case 'LOGOUT':
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      return {
        loggedIn: false,
        email: '',
        name: '',
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userData, dispatchAuth] = useReducer(authReducer, authData, authObject => {
    const ISSERVER = typeof window === "undefined";

    if(!ISSERVER) {
      let storedSession = localStorage.getItem("userData");
      if(storedSession) {
        storedSession = JSON.parse(storedSession)
        console.log(storedSession);
        return {
          loggedIn: true,
          email: storedSession.email,
          name: storedSession.name,
        };
      }

      return authObject;
    }
  });

  return (
    <AuthContext.Provider value={{ userData, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
