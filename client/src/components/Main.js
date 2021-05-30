import React from 'react';
import { useUser } from '../context/UserContext';
import { logOut } from '../utils/axiosFunctions';
import { getGreeting } from '../utils/helperFunctions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Main = () => {
  const user = useUser();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.header}>
        <Typography component="h2" variant="h6">
          Good {getGreeting()} {user.Username}
        </Typography>
        <Button color="secondary" onClick={logOut}>
          Log Out
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Main;
