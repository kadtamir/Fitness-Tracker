import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [activityName, setActivityName] = React.useState('');
  const [met, setMet] = React.useState(0);

  const handleClick = (activityName, met) => {
    console.log(activityName, met);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="name"
        label="Activity Name"
        variant="outlined"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <TextField
        id="MET"
        label="MET"
        variant="outlined"
        type="number"
        value={met}
        onChange={(e) => setMet(e.target.value)}
      />
      <Button variant="outlined" onClick={() => handleClick(activityName, met)}>
        Add Activity
      </Button>
    </form>
  );
}
