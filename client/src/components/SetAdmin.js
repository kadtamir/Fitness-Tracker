import React from 'react';
import { setIsAdmin } from '../utils/axiosFunctions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
}));

const SetAdmin = () => {
  const classes = useStyles();
  const [userId, setUserId] = React.useState('');
  const [admin, setAdmin] = React.useState(false);

  const handleClick = (userId, admin) => {
    setIsAdmin(userId, admin);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="name"
        label="User ID"
        variant="outlined"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={admin}
            onChange={() => setAdmin((prev) => !prev)}
            name="setAdmin"
            color="primary"
          />
        }
        label="Admin"
      />
      <Button variant="outlined" onClick={() => handleClick(userId, admin)}>
        Set Admin
      </Button>
    </form>
  );
};

export default SetAdmin;
