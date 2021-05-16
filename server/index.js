'use strict';
const express = require('express');
const app = express();
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const port = 3001;

// express server middlewars
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: 'userId',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1000, // 1 Hour
    },
  })
);

app.use('/', routes);

// Run the server on the specified port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
