import React from 'react';
// import PropTypes from 'prop-types'
import Logo from '../images/logo.JPG';
import Login from './Login';
import Register from './Register';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
  },
  logo: {
    display: 'block',
    height: '150px',
    margin: '20px auto',
  },
  buttons: {
    display: 'block',
    textAlign: 'center',
  },
  container: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    margin: '20px',
    padding: theme.spacing(2, 2),
    borderRadius: theme.shape.borderRadius,
  },
}));

const Authentication = ({ setUser }) => {
  const classes = useStyles();
  const [isRegistered, setIsRegistered] = React.useState(true);
  const handleChange = (value) => setIsRegistered(value);
  return (
    <Container maxWidth="xs">
      <img src={Logo} className={classes.logo} alt="MishaFit" />
      <ButtonGroup
        color="primary"
        aria-label="login or register"
        className={classes.buttons}
      >
        <Button onClick={() => handleChange(true)}>Sign in</Button>
        <Button onClick={() => handleChange(false)}>Sign up</Button>
      </ButtonGroup>
      <Paper className={classes.container}>
        {isRegistered ? (
          <Login setUser={setUser} />
        ) : (
          <Register setUser={setUser} />
        )}
      </Paper>
    </Container>
  );
};

Authentication.propTypes = {};

export default Authentication;
