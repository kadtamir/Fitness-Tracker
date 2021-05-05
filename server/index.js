'use strict';
const DBBuildup = require('./buildDB');
const { v4 } = require('uuid');
const moment = require('moment');
// Express server dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = 3001;

// Javascript express server middlewars
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: 'userId',
    secret: 'AfekaHadas2021',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1000, // 1 Hour
    },
  })
);
// Instantiate a db class
const s = new DBBuildup();
// Generate unique base64 ID
const generateID = () =>
  //Generates hex ID, removes decorations and converts it to base 64 for shorter IDs
  Buffer.from(v4().replace('-', ''), 'hex').toString('base64');

// Server routes - The frontend send requests to specific paths
//and that is how the server knows what to do

// Show all workouts
app.get('/api/get/allWorkouts/:ID', (req, res) => {
  const id = req.params.ID.slice(1); // Remove leading colon
  const sqlSelect = `SELECT wDate,eType,Location,Duration,Feeling,MET FROM trainee t
  JOIN workout w ON t.TID = w.TID
  JOIN exercise e ON e.EID=w.EID
  WHERE t.TID=${id};`;
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Get trainee Info
app.get('/api/get/trainee:ID', (req, res) => {
  const id = req.params.ID.slice(1); // Remove leading colon
  const sqlSelect = `SELECT * FROM fitness.trainee WHERE TID=${id};`;
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Check for valid username
app.get('/validate:USERNAME', (req, res) => {
  const username = req.params.USERNAME.slice(1); // Remove leading colon
  const sqlSelect = `SELECT Username FROM credentials WHERE Username="${username}";`;
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});
// Register a new trainee
app.post('/register', (req, res) => {
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
app.post('/login', (req, res) => {
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
app.get('/login', (req, res) => {
  if (req.session.user) res.send({ loggedIn: true, user: req.session.user });
  else res.send({ loggedIn: false });
});

// Get all possible exercises
app.get('/api/get/allExercises', (req, res) => {
  const sqlSelect = 'SELECT EID,eType FROM exercise;';
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Get calorie calculator needed data
app.get('/api/get/calculator', (req, res) => {
  const sqlSelect = 'SELECT eType,MET FROM exercise;';
  s.db.query(sqlSelect, (err, data) => {
    if (err) res.send({ err, error: true });
    else res.send({ data, error: false });
  });
});

// Insert a new workout
app.post('/api/workout/insert', (req, res) => {
  const wid = generateID();
  const { select, feeling, location, duration, distance, date, id } = req.body;
  const sqlInsert =
    'INSERT INTO workout (WID,TID,EID,wDate,Duration,Distance,Location,Feeling) VALUES (?,?,?,?,?,?,?,?)';
  s.db.query(
    sqlInsert,
    [
      wid,
      id,
      select,
      moment(date).format('YYYY-MM-DD hh:mm:ss'),
      duration,
      distance,
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
app.delete('/api/workout/delete/:wid', (req, res) => {
  // To be implemented once the front end is ready (verified by email with hadas)
  console.log('Delete');
});

// Update workout
app.put('/api/workout/update', (req, res) => {
  // To be implemented once the front end is ready (verified by email with hadas)
  console.log('Delete');
});

// Run the server on the specified port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
