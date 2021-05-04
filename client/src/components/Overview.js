import React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Overview = ({ user }) => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6">
        Hello User: {user}
      </Typography>
    </React.Fragment>
  );
};

Overview.propTypes = {};

export default Overview;
