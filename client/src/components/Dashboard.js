import React from 'react';
import Register from './Register';
import { useUser } from '../context/UserContext';
import { calculateBMI, getBmiClass, getAge } from '../utils/helperFunctions';
import { updateTrainee } from '../utils/axiosFunctions';
import { makeStyles } from '@material-ui/core/styles';
import BMI from '../images/BMI.png';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import TabPanel from './TabPanel';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bmiContainer: {
    width: '100%',
    position: 'relative',
  },
  bmiImg: {
    width: '100%',
  },
  indicator: {
    position: 'absolute',
    width: '20%',
    height: '97%',
    border: '2px solid black',
  },
}));

const Dashboard = () => {
  const user = useUser();
  const classes = useStyles();
  const bmi = calculateBMI(user.Weight, user.Height);
  const [editModalState, setEditModalState] = React.useState(false);
  
  const updateInfo = () => setEditModalState(true);
  const handleClose = () => setEditModalState(false);

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography component="h3" variant="h6">
          Dashboard
        </Typography>
        <Tooltip title="Edit">
          <IconButton aria-label="edit" onClick={updateInfo}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Divider />
      <Typography component="p" variant="body1">
        Age: {getAge(user.birthDate)}
      </Typography>
      <Typography component="p" variant="body1">
        Gender: {user.Gender}
      </Typography>
      <Typography component="p" variant="body1">
        Height: {user.Height} cm
      </Typography>
      <Typography component="p" variant="body1">
        Weight: {user.Weight} kg
      </Typography>
      <Typography component="p" variant="body1">
        BMI: {bmi} kg/m<sup>2</sup>
      </Typography>
      <div className={classes.bmiContainer}>
        <div
          className={classes.indicator}
          style={{ left: `${getBmiClass(bmi) * 20}%` }}
        ></div>
        <img src={BMI} alt="BMI scale" className={classes.bmiImg} />
      </div>
      <Modal
        open={editModalState}
        onClose={handleClose}
        aria-labelledby="Update trainee info"
        aria-describedby="Update trainee info popup screen"
      >
        {
          <Container maxWidth="xs">
            <TabPanel value={2} index={2}>
              <Register
                buttonText="Update"
                buttonAction={updateTrainee}
                user={user}
                stateManagment={{
                  closeModal: () => setEditModalState(false),
                }}
              />
            </TabPanel>
          </Container>
        }
      </Modal>
    </React.Fragment>
  );
};

export default Dashboard;
