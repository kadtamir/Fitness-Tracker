import React from 'react';
// import useDebounce from '../hooks/useDebounced';
import moment from 'moment';
import axios from 'axios';
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
  btn: {
    display: 'block',
    margin: 'auto',
    width: '80%',
  },
}));

const Register = ({ setUser }) => {
  const classes = useStyles();
  const [taken, setTaken] = React.useState(false);
  let timeout;
  const isTaken = async (text) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const response = await axios.get(
        `http://localhost:3001/validate:${text}`
      );
      setTaken(!!response.data.data.length);
    }, 500);
  };
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
        } else if (taken) {
          errors.username = 'Username is already taken';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 4) {
          errors.password = 'Password must be at least 4 characters';
        }
        if (!values.weight || values.weight < 1) {
          errors.weight = 'Required';
        }
        if (!values.height || values.height < 1) {
          errors.height = 'Required';
        }
        if (values.date.year() === moment().year()) {
          errors.date = 'Please set a valid birth date';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post('http://localhost:3001/register', values)
          .then((response) => {
            setUser(response.data.userId);
            setSubmitting(false);
          })
          .catch((error) => {
            console.log(error);
            setSubmitting(false);
          });
      }}
    >
      {({ submitForm, isSubmitting, setFieldValue, errors }) => (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Form>
            <Box margin={1}>
              <Field
                component={TextField}
                name="username"
                type="text"
                label="Username"
                onChange={(e) => {
                  isTaken(e.target.value);
                  setFieldValue('username', e.target.value);
                }}
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
                variant="outlined"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                className={classes.btn}
              >
                Register
              </Button>
            </Box>
          </Form>
        </MuiPickersUtilsProvider>
      )}
    </Formik>
  );
};

export default Register;
