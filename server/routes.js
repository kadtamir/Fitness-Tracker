'use strict';
const routes = require('express').Router();
const bcrypt = require('bcrypt');
const DBBuildup = require('./buildDB');
const moment = require('moment');
const generateID = require('./utils/generateID');
const saltRounds = 10;

// Instantiate a db class
const s = new DBBuildup();

// Server routes - The frontend send requests to specific paths
//and that is how the server knows what to do

// Get all workouts
routes.get('/getAllWorkouts:ID', (req, res) => {
  const id = req.params.ID.slice(1); // Remove leading colon
  const sqlSelect = `SELECT WID,wDate,eType,Duration,Distance,Calories,Location,Feeling FROM trainee t
  JOIN workout w ON t.TID = w.TID
  JOIN exercise e ON e.EID=w.EID
  WHERE t.TID="${id}";`;
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Get trainee Info
routes.get('/getTrainee:ID', (req, res) => {
  const id = req.params.ID.slice(1); // Remove leading colon
  const sqlSelect = `SELECT * FROM fitness.trainee WHERE TID="${id}";`;
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Check for valid username
routes.get('/validate:USERNAME', (req, res) => {
  const username = req.params.USERNAME.slice(1); // Remove leading colon
  const sqlSelect = `SELECT Username FROM credentials WHERE Username="${username}";`;
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});
// Register a new trainee
routes.post('/register', (req, res) => {
  const { username, password, date, gender, weight, height } = req.body;
  const uid = generateID();
  const lastUpdate = moment().format('YYYY-MM-DD hh:mm:ss');
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) res.send({ err, error: true });
    const sqlInsert =
      'INSERT INTO credentials (UID,Username,Pass) VALUES (?,?,?)';
    s.db.query(sqlInsert, [uid, username, hash], (err, result) => {
      if (err) {
        res.send({ err, error: true });
        return;
      } else {
        req.session.user = uid;
        res.send({ userId: uid, error: false });
        // Set up trainee info
        const traineeInsert =
          'INSERT INTO trainee (TID,birthDate,Gender,Weight,Height,lastUpdated) VALUES (?,?,?,?,?,?)';
        s.db.query(
          traineeInsert,
          [
            uid,
            moment(date).format('YYYY-MM-DD'),
            gender,
            weight,
            height,
            lastUpdate,
          ],
          (error, result) => {
            if (error) {
              res.send({ error, error: true });
              return;
            }
          }
        );
      }
    });
  });
});

// Login an existing trainee
routes.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlSelect = 'SELECT * FROM credentials WHERE Username= ?;';
  s.db.query(sqlSelect, username, (err, result) => {
    if (result.length > 0) {
      bcrypt.compare(password, result[0].Pass, (error, response) => {
        if (response) {
          req.session.user = result[0].UID;
          res.send({ auth: true, userId: result[0].UID });
        } else
          res.send({ auth: false, message: 'Wrong Username or Password!' });
      });
    } else res.send({ auth: false, message: "User Doesn't Exist!" });
  });
});

// Check if already logged in
routes.get('/login', (req, res) => {
  if (req.session.user) res.send({ loggedIn: true, user: req.session.user });
  else res.send({ loggedIn: false });
});

// Get all possible exercises
routes.get('/getAllExercises', (req, res) => {
  const sqlSelect = 'SELECT EID,eType FROM exercise;';
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Get calorie calculator needed data
routes.get('/get/calculator', (req, res) => {
  const sqlSelect = 'SELECT eType,MET FROM exercise;';
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Get workout details
routes.get('/workout/get:ID', (req, res) => {
  const id = req.params.ID.slice(1); // Remove leading colon
  const sqlSelect = `SELECT EID,Feeling,Location,Duration,Distance,wDate FROM workout WHERE WID="${id}";`;
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Insert a new workout
routes.post('/workout/insert', (req, res) => {
  const wid = generateID();
  const { select, feeling, location, duration, distance, calories, date, id } =
    req.body;
  const sqlInsert =
    'INSERT INTO workout (WID,TID,EID,wDate,Duration,Distance,Calories,Location,Feeling) VALUES (?,?,?,?,?,?,?,?,?)';
  s.db.query(
    sqlInsert,
    [
      wid,
      id,
      select,
      moment(date).format('YYYY-MM-DD hh:mm:ss'),
      duration,
      distance,
      calories,
      location.toUpperCase(),
      feeling,
    ],
    (error, result) => {
      if (error) {
        res.send({ error, err: true });
        return;
      } else {
        res.send({ result, error: false });
      }
    }
  );
});

// Delete a workout
routes.delete('/workout/delete', (req, res) => {
  const rowsIds = req.body.map((id) => `"${id}"`).join(',');
  const sqlDelete = `DELETE FROM workout WHERE WID IN (${rowsIds});`;
  s.db.query(sqlDelete, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Update workout
routes.put('/workout/update', (req, res) => {
  const { select, feeling, location, duration, distance, calories, date, WID } =
    req.body;
  const sqlUpdate = `UPDATE workout SET EID=${select},wDate="${moment(
    date
  ).format(
    'YYYY-MM-DD hh:mm:ss'
  )}",Duration=${duration},Distance=${distance}, Calories=${calories},Location="${location.toUpperCase()}",Feeling=${feeling} WHERE WID="${WID}";`;
  s.db.query(sqlUpdate, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

module.exports = routes;
