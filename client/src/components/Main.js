import React from 'react';
import { useUser } from '../context/UserContext';
import { logOut } from '../utils/axiosFunctions';
import { getGreeting } from '../utils/helperFunctions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Main = () => {
  const user = useUser();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6">
        Good {getGreeting()} {user.Username}
      </Typography>
      <Button color="secondary" onClick={logOut}>
        Log Out
      </Button>
    </React.Fragment>
  );
};

export default Main;
