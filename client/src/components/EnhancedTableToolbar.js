import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { updateWorkout } from '../utils/axiosFunctions';
import TabPanel from './TabPanel';
import AddWorkout from './AddWorkout';
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = ({ selected, updateList, setSelected }) => {
  const classes = useToolbarStyles();
  const numSelected = selected.length;
  const [editModalState, setEditModalState] = React.useState(false);

  const updateRow = () => {
    setEditModalState(true);
  };

  const handleClose = () => {
    setEditModalState(false);
  };

  const deleteRows = (ids) => {
    axios
      .delete('http://localhost:3001/api/workout/delete', { data: ids })
      .then(() => {
        updateList();
        setSelected([]);
      })
      .catch((e) => alert(e));
  };

  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <React.Fragment>
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>

            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => deleteRows(selected)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Workouts History
          </Typography>
        )}
        {numSelected === 1 ? (
          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={() => updateRow()}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
      <Modal
        open={editModalState}
        onClose={handleClose}
        aria-labelledby="Edit workout"
        aria-describedby="Edit workout popup screen"
      >
        {
          <Container maxWidth="xs">
            <TabPanel value={2} index={2}>
              <AddWorkout
                buttonText="Edit Workout"
                buttonAction={updateWorkout}
                workoutId={selected[0]}
                stateManagment={{
                  closeModal: () => setEditModalState(false),
                  updateList,
                }}
              />
            </TabPanel>
          </Container>
        }
      </Modal>
    </React.Fragment>
  );
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
};

export default EnhancedTableToolbar;
