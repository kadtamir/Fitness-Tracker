import React from 'react';
import { insertExercise } from '../utils/axiosFunctions';
import { capitalize } from '../utils/helperFunctions';
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

const AddExercise = () => {
  const classes = useStyles();
  const [activityName, setActivityName] = React.useState('');
  const [met, setMet] = React.useState(0);
  const [distance, setDistance] = React.useState(true);

  const handleClick = (activityName, met) => {
    insertExercise(capitalize(activityName), met);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="name"
        label="Exercise Name"
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
      <FormControlLabel
        control={
          <Checkbox
            checked={distance}
            onChange={() => setDistance((prev) => !prev)}
            name="Distance"
            color="primary"
          />
        }
        label="Distance"
      />
      <Button variant="outlined" onClick={() => handleClick(activityName, met)}>
        Add Exercise
      </Button>
    </form>
  );
};

export default AddExercise;
