import fitness from './axiosInstance';
import { calculateCalories } from './helperFunctions';

export const checkUsername = (text) => fitness.get(`/validate:${text}`);

export const handleRegister = (values, stateManagment) => {
  fitness
    .post('/register', values)
    .then((response) => {
      stateManagment.setSubmitting(false);
      stateManagment.updateUser(response.data.userId);
    })
    .catch((error) => {
      alert(error);
      stateManagment.setSubmitting(false);
    });
};

export const handleSubmit = (userName, password, updateUser) => {
  fitness
    .post('/login', { username: userName, password })
    .then((response) => {
      if (response.data.auth) {
        updateUser(response.data.userId);
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export const contextUserUpdate = (newUser, setUser) => {
  fitness
    .get(`/getTrainee:${newUser}`)
    .then(({ data }) => {
      setUser(data.data[0]);
    })
    .catch((e) => alert(e));
};

export const checkAuthentication = (updateUser) => {
  fitness.get('/login').then((response) => {
    if (response.data.loggedIn) {
      updateUser(response.data.user);
    }
  });
};

export const getWorkouts = (userId, setWorkouts) => {
  fitness
    .get(`/getAllWorkouts:${userId}`)
    .then(({ data }) => {
      setWorkouts(data.data);
    })
    .catch((e) => alert(e));
};

export const getExercises = (setExerciseList) => {
  fitness.get('/getAllExercises').then((response) => {
    const exercises = response.data.data.map((exercise) => ({
      value: exercise.EID,
      label: exercise.eType,
    }));
    setExerciseList(exercises);
  });
};

export const deleteRows = (ids, updateList, setSelected) => {
  fitness
    .delete('/workout/delete', { data: ids })
    .then(() => {
      updateList();
      setSelected([]);
    })
    .catch((e) => alert(e));
};

export const insertWorkout = (values, user, stateManagment) => {
  fitness
    .post('/workout/insert', {
      ...values,
      id: user.TID,
      calories: calculateCalories(user.Weight, values.duration),
    })
    .then(() => {
      stateManagment.setSubmitting(false);
    })
    .catch((error) => {
      alert(error);
      stateManagment.setSubmitting(false);
    });
};

export const getWorkoutDetails = (workoutId, setWorkoutDetails) => {
  fitness
    .get(`/workout/get:${workoutId}`)
    .then(({ data }) => {
      const { EID, Feeling, Location, Duration, Distance, wDate } =
        data.data[0];
      setWorkoutDetails({
        select: EID,
        feeling: Feeling,
        location: Location,
        duration: Duration,
        distance: Distance,
        date: wDate,
      });
    })
    .catch((e) => alert(e));
};

export const updateWorkout = (values, user, stateManagment) => {
  fitness
    .put('/workout/update', {
      ...values,
      calories: calculateCalories(user.Weight, values.duration),
    })
    .then(() => {
      stateManagment.setSubmitting(false);
      stateManagment.closeModal();
      stateManagment.updateList();
    })
    .catch((error) => {
      alert(error);
      stateManagment.setSubmitting(false);
    });
};

export const updateTrainee = (values, stateManagment) => {
  fitness
    .put('/trainee/update', {
      ...values,
    })
    .then(() => {
      stateManagment.setSubmitting(false);
      window.location.reload();
    })
    .catch((error) => {
      alert(error);
      stateManagment.setSubmitting(false);
    });
};

export const logOut = () => {
  fitness
    .post('/logout')
    .then(() => window.location.reload())
    .catch((e) => alert(e));
};
