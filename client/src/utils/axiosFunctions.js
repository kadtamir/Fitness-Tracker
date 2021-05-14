const axios = require('axios');
axios.defaults.withCredentials = true;
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
