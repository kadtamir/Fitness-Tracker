import React from 'react';
// import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      padding: theme.spacing(1),
      width: '90%',
    },
    textAlign: 'center',
  },
  input: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
  },
  btn: {
    marginTop: '15px',
  },
  textField: {
    width: '100%',
  },
}));

const Login = (props) => {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete="off">
      <div className={classes.input}>
        <AccountCircleIcon className={classes.icon} />
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          className={classes.textField}
        />
      </div>
      <div className={classes.input}>
        <LockIcon className={classes.icon} />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          className={classes.textField}
        />
      </div>
      <Button variant="outlined" color="primary" className={classes.btn}>
        Login
      </Button>
    </form>
  );
};

Login.propTypes = {};

export default Login;
