import React from 'react';
import { contextUserUpdate } from '../utils/axiosFunctions';
const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export const useUser = () => React.useContext(UserContext);
export const useUserUpdate = () => React.useContext(UserUpdateContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    TID: '',
    birthDate: null,
    Gender: '',
    Weight: null,
    Height: null,
    lastUpdated: null,
  });
  const updateUser = React.useCallback((newUser) => {
    contextUserUpdate(newUser, setUser);
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
