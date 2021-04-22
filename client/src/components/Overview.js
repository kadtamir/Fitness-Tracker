import React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Overview = (props) => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6">
        Hello User
      </Typography>
    </React.Fragment>
  );
};

Overview.propTypes = {};

export default Overview;
