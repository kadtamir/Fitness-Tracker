import React from 'react';
import axios from 'axios';
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
  const updateUser = (newUser) => {
    axios
      .get(`http://localhost:3001/api/get/trainee:${newUser}`)
      .then(({ data }) => {
        setUser(data.data[0]);
      })
      .catch((e) => alert(e));
  };

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
