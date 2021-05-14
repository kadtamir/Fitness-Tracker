const axios = require('axios');
axios.defaults.withCredentials = true;
const calculateCalories = (weight, duration) => (3.5 * weight * duration) / 200;

export const getWorkouts = (userId, callback) => {
  axios
    .get(`http://localhost:3001/api/get/allWorkouts:${userId}`)
    .then(({ data }) => {
      callback(data.data);
    })
    .catch((e) => alert(e));
};

export const getExercises = (callback) => {
  axios.get('http://localhost:3001/api/get/allExercises').then((response) => {
    const exercises = response.data.data.map((exercise) => ({
      value: exercise.EID,
      label: exercise.eType,
    }));
    callback(exercises);
  });
};

export const insertWorkout = (values, user, stateManagment) => {
  axios
    .post('http://localhost:3001/api/workout/insert', {
      ...values,
      id: user.TID,
      calories: calculateCalories(user.Weight, values.duration),
    })
    .then((response) => {
      stateManagment.setSubmitting(false);
    })
    .catch((error) => {
      alert(error);
      stateManagment.setSubmitting(false);
    });
};

export const getWorkoutDetails = (workoutId, setWorkoutDetails) => {
  axios
    .get(`http://localhost:3001/api/get/Workout:${workoutId}`)
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
  axios
    .put('http://localhost:3001/api/workout/update', {
      ...values,
      calories: calculateCalories(user.Weight, values.duration),
    })
    .then((response) => {
      stateManagment.setSubmitting(false);
      stateManagment.closeModal();
      stateManagment.updateList();
      // window.location.reload();
    })
    .catch((error) => {
      alert(error);
      stateManagment.setSubmitting(false);
    });
};
