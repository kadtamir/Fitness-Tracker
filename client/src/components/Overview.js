import React from 'react';
// import PropTypes from 'prop-types';
import { useUser } from '../context/UserContext';
import Typography from '@material-ui/core/Typography';

const Overview = (props) => {
  const userId = useUser();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6">
        Hello User: {userId}
      </Typography>
    </React.Fragment>
  );
};

Overview.propTypes = {};

export default Overview;
