import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useUserUpdate } from '../context/UserContext';
import { checkUsername } from '../utils/axiosFunctions';
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
  root: {
    textAlign: 'center',
  },
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

const Register = ({ buttonText, buttonAction, user }) => {
  const updateUser = useUserUpdate();
  const classes = useStyles();
  const [taken, setTaken] = React.useState(false);
  let timeout;
  const isTaken = async (text) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const response = await checkUsername(text);
      setTaken(!!response.data.data.length);
    }, 500);
  };
  return (
    <Formik
      initialValues={
        user
          ? {
              weight: user.Weight,
              height: user.Height,
              date: moment(user.birthDate),
              gender: user.Gender,
            }
          : {
              username: '',
              password: '',
              weight: '',
              height: '',
              date: moment(),
              gender: 'Male',
            }
      }
      validate={(values) => {
        const errors = {};
        if (!user && !values.username) {
          errors.username = 'Required';
        } else if (!user && taken) {
          errors.username = 'Username is already taken';
        }
        if (!user && !values.password) {
          errors.password = 'Required';
        } else if (!user && values.password.length < 4) {
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
        buttonAction(
          { ...values, TID: user?.TID },
          { setSubmitting, updateUser }
        );
      }}
    >
      {({ submitForm, isSubmitting, setFieldValue, errors }) => (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Form className={classes.root}>
            {!user && (
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
            )}
            {!user && (
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                />
              </Box>
            )}
            <Box margin={1}>
              <Field
                component={TextField}
                type="number"
                label="Weight[kg]"
                name="weight"
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                type="number"
                label="Height[cm]"
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
                <ToggleButton value="Male" aria-label="centered">
                  <img
                    src={MaleIcon}
                    className={classes.gender}
                    alt="MaleIcon"
                  />
                </ToggleButton>
                <ToggleButton value="Female" aria-label="centered">
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
                {buttonText}
              </Button>
            </Box>
          </Form>
        </MuiPickersUtilsProvider>
      )}
    </Formik>
  );
};

Register.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Register;
