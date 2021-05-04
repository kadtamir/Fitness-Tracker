import * as React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ToggleButtonGroup } from 'formik-material-ui-lab';
import Box from '@material-ui/core/Box';
import ToggleButton from '@material-ui/lab/ToggleButton';
import MaleIcon from '../images/male.png';
import FemaleIcon from '../images/female.png';

const useStyles = makeStyles((theme) => ({
  icons: {
    width: '50%',
  },
  gender: {
    width: '50%',
  },
}));

const Register = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        weight: '',
        height: '',
        date: moment(),
        gender: 'male',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Required';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        if (!values.weight || values.weight < 1) {
          errors.weight = 'Required';
        }
        if (!values.height || values.height < 1) {
          errors.height = 'Required';
        }
        if (values.date.year === moment().year) {
          errors.date = 'Please set a valid birth date';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting, touched, errors }) => (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Form>
            <Box margin={1}>
              <Field
                component={TextField}
                name="username"
                type="text"
                label="Username"
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                type="number"
                label="Weight"
                name="weight"
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                type="number"
                label="Height"
                name="height"
              />
            </Box>
            {isSubmitting && <LinearProgress />}
            <Box margin={1}>
              <Field
                component={DatePicker}
                name="date"
                label="Birth Date"
                format="DD-MM-YYYY"
              />
            </Box>
            <Box margin={1}>
              <Typography>Gender</Typography>
              <Field
                component={ToggleButtonGroup}
                exclusive
                name="gender"
                type="checkbox"
                className={classes.icons}
              >
                <ToggleButton value="male" aria-label="centered">
                  <img
                    src={MaleIcon}
                    className={classes.gender}
                    alt="MaleIcon"
                  />
                </ToggleButton>
                <ToggleButton value="female" aria-label="centered">
                  <img
                    src={FemaleIcon}
                    className={classes.gender}
                    alt="FemaleIcon"
                  />
                </ToggleButton>
              </Field>
            </Box>
            <Box margin={1}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Box>
          </Form>
        </MuiPickersUtilsProvider>
      )}
    </Formik>
  );
};

export default Register;
