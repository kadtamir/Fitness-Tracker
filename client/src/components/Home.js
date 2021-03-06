import React from 'react';
import { useUser } from '../context/UserContext';
import { insertWorkout } from '../utils/axiosFunctions';
import TabPanel from './TabPanel';
import Overview from './Overview';
import Workouts from './Workouts';
import AddWorkout from './AddWorkout';
import Admin from './Admin';
import Logo from '../images/logo.JPG';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  logo: {
    height: '50px',
    width: '70px',
  },
}));

const Home = () => {
  const user = useUser();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Container maxWidth="lg" className={classes.container}>
          <img src={Logo} className={classes.logo} alt="MishaFit" />
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs"
          >
            <Tab className={classes.tab} label="Overview" {...a11yProps(0)} />
            <Tab className={classes.tab} label="Workouts" {...a11yProps(1)} />
            <Tab
              className={classes.tab}
              label="Add Workout"
              {...a11yProps(2)}
            />
            {user.isAdmin && (
              <Tab className={classes.tab} label="Admin" {...a11yProps(3)} />
            )}
          </Tabs>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <TabPanel value={value} index={0}>
          <Overview />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Workouts />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AddWorkout buttonText="Add Workout" buttonAction={insertWorkout} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Admin />
        </TabPanel>
      </Container>
    </React.Fragment>
  );
};

export default Home;
