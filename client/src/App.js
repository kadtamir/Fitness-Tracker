import React from 'react';
import { useUser, useUserUpdate } from './context/UserContext';
import { checkAuthentication } from './utils/axiosFunctions';
import Home from './components/Home';
import Authentication from './components/Authentication';

const App = () => {
  const updateUser = useUserUpdate();
  const user = useUser();
  React.useEffect(() => {
    checkAuthentication(updateUser);
  }, [updateUser]);

  return user.TID ? <Home /> : <Authentication />;
};

export default App;
