import React from 'react';

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export const useUser = () => React.useContext(UserContext);
export const useUserUpdate = () => React.useContext(UserUpdateContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = React.useState('');
  const updateUser = (newUser) => setUserId(newUser);

  return (
    <UserContext.Provider value={userId}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
