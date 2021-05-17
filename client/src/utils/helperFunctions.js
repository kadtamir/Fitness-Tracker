import moment from 'moment';

export const calculateCalories = (weight, duration) =>
  (3.5 * weight * duration) / 200;

export const getGreeting = () => {
  const hour = moment().hour();
  if (hour >= 6 && hour < 12) {
    return 'morning';
  }
  if (hour >= 12 && hour < 18) {
    return 'afternoon';
  }
  if (hour >= 18 && hour < 22) {
    return 'evening';
  }
  return 'night';
};

export const getAge = (birthDate) => moment().diff(birthDate, 'years');

export const calculateBMI = (weight, height) =>
  (weight / (height / 100) ** 2).toFixed(1);

export const getBmiClass = (bmi) => {
  if (bmi <= 18.5) {
    return 0;
  }
  if (bmi > 18.5 && bmi <= 23.5) {
    return 1;
  }
  if (bmi > 23.5 && bmi <= 27.5) {
    return 2;
  }
  if (bmi > 27.5 && bmi <= 29) {
    return 3;
  }
  return 4;
};
