import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dashboard from './Dashboard';
import Main from './Main';

const Overview = () => {
  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item md={8} xs={12}>
          <Grid item xs={12}>
            <Main />
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <Dashboard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Overview;
