'use strict';
const { v4 } = require('uuid');
// Generate unique base64 ID
const generateID = () =>
  //Generates hex ID, removes decorations and converts it to base 64 for shorter IDs
  Buffer.from(v4().replace('-', ''), 'hex')
    .toString('base64')
    .replace('/', '0');

module.exports = generateID;
