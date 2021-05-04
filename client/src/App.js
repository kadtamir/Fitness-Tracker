import React from 'react';
import Home from './components/Home';
import Authentication from './components/Authentication';

const App = () => {
  const [user, setUser] = React.useState(null);
  return user ? <Home user={user} /> : <Authentication setUser={setUser} />;
};

export default App;
