import { createContext } from 'react';

const AppContext = createContext({
  token: null,
  setToken: () => {},
  mobileMatches: false,
  setMobileMatches: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  userId: null,
  setUserId: () => {},
  logout: () => {},
  showNotification: () => {}
});

export default AppContext;
