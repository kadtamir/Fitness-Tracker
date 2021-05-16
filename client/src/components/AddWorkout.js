import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getExercises, getWorkoutDetails } from '../utils/axiosFunctions';
import { useUser } from '../context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    width: '50%',
    '&>*': {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  selects: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  exercise: {
    width: '11ch',
    marginLeft: 0,
    '&>*': {
      width: '100%',
    },
  },
  btn: {
    display: 'block',
    margin: 'auto',
    width: '100%',
  },
}));

const AddWorkout = ({
  buttonText,
  buttonAction,
  workoutId,
  stateManagment,
}) => {
  const classes = useStyles();
  const user = useUser();
  const [exerciseList, setExerciseList] = React.useState([]);
  const [workoutDetails, setWorkoutDetails] = React.useState({});
  React.useEffect(() => {
    getExercises(setExerciseList);
    if (workoutId !== 0) {
      getWorkoutDetails(workoutId, setWorkoutDetails);
    }
  }, [workoutId]);

  return (
    <Container maxWidth="xs">
      {exerciseList.length && (workoutDetails.select || workoutId === 0) ? (
        <Formik
          initialValues={
            workoutId
              ? workoutDetails
              : {
                  select: '',
                  feeling: '',
                  location: '',
                  duration: 0,
                  distance: 0,
                  date: moment(),
                }
          }
          validate={(values) => {
            const errors = {};
            if (!values.select) {
              errors.select = 'Required';
            }
            if (!values.feeling) {
              errors.feeling = 'Required';
            }
            if (values.duration <= 0) {
              errors.duration = 'Required';
            }
            if (values.select && values.select <= 3 && values.distance <= 0) {
              errors.distance = 'Required';
            }
            if (!values.location) {
              errors.location = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            buttonAction({ ...values, WID: workoutId }, user, {
              ...stateManagment,
              setSubmitting,
            });
          }}
        >
          {({ submitForm, isSubmitting, values }) => (
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Form className={classes.container}>
                <Box className={classes.selects}>
                  <Box margin={1} className={classes.exercise}>
                    <Field
                      component={TextField}
                      type="text"
                      name="select"
                      label="Exercise"
                      size="medium"
                      defaultValue=""
                      select
                      variant="standard"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ placeholder: 'text' }}
                    >
                      {exerciseList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                  <Box margin={1}>
                    <Field
                      component={TextField}
                      type="text"
                      name="feeling"
                      label="Feeling"
                      defaultValue=""
                      select
                      variant="standard"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                </Box>
                <Box className={classes.selects}>
                  <Box margin={1}>
                    <Field
                      component={TextField}
                      type="number"
                      label="Duration[min]"
                      name="duration"
                    />
                  </Box>
                  {values.select && values.select <= 3 && (
                    <Box margin={1}>
                      <Field
                        component={TextField}
                        type="number"
                        label="Distance[km]"
                        name="distance"
                      />
                    </Box>
                  )}
                </Box>
                <Box margin={1}>
                  <Field
                    component={DateTimePicker}
                    name="date"
                    label="Time"
                    format="DD-MM-YYYY HH:mm"
                  />
                </Box>
                <Box margin={1}>
                  <Field
                    component={TextField}
                    name="location"
                    type="text"
                    label="Location"
                  />
                </Box>
                {isSubmitting && <LinearProgress />}
                <Box margin={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    className={classes.btn}
                  >
                    {buttonText}
                  </Button>
                </Box>
              </Form>
            </MuiPickersUtilsProvider>
          )}
        </Formik>
      ) : (
        <LinearProgress />
      )}
    </Container>
  );
};

AddWorkout.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
  workoutId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stateManagment: PropTypes.object,
};

export default AddWorkout;
