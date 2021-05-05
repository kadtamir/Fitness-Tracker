import React from 'react';
// import PropTypes from 'prop-types'
import { useUserUpdate } from '../context/UserContext';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

axios.defaults.withCredentials = true;

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
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const updateUser = useUserUpdate();
  const handleSubmit = () => {
    axios
      .post('http://localhost:3001/login', { username: userName, password })
      .then((response) => {
        if (response.data.auth) {
          // setAuth(true);
          updateUser(response.data.userId);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <form className={classes.root} autoComplete="off">
      <div className={classes.input}>
        <AccountCircleIcon className={classes.icon} />
        <TextField
          id="username"
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          className={classes.textField}
        />
      </div>
      <div className={classes.input}>
        <LockIcon className={classes.icon} />
        <TextField
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          type="password"
          className={classes.textField}
        />
      </div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </form>
  );
};

Login.propTypes = {};

export default Login;
