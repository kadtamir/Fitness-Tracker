import React from 'react';
import axios from 'axios';
import { useUser, useUserUpdate } from './context/UserContext';
import Home from './components/Home';
import Authentication from './components/Authentication';

axios.defaults.withCredentials = true;

const App = () => {
  // const [auth, setAuth] = React.useState(false);
  const updateUser = useUserUpdate();
  const user = useUser();
  React.useEffect(() => {
    axios.get('http://localhost:3001/login').then((response) => {
      if (response.data.loggedIn) {
        // setAuth(true);
        updateUser(response.data.user);
      }
    });
  });

  return user ? <Home /> : <Authentication />;
};

export default App;
