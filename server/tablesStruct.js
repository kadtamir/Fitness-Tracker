'use strict';
const tablesStruct = {
  // One object to hold the tables structure with every table's details.
  credentials: {
    featuresNames: ['UID', 'Username', 'Pass'],
    featuresTypes: ['VARCHAR(255)', 'VARCHAR(255) UNIQUE', 'VARCHAR(255)'],
    pks: ['UID'],
    fks: [],
    references: [],
    referenceTable: [],
  },
  trainee: {
    featuresNames: [
      'TID',
      'birthDate',
      'Gender',
      'Weight',
      'Height',
      'lastUpdated',
    ],
    featuresTypes: [
      'VARCHAR(255)',
      'DATE',
      'VARCHAR(255)',
      'INT',
      'INT',
      'DATETIME',
    ],
    pks: ['TID'],
    fks: ['TID'],
    references: ['UID'],
    referenceTable: ['credentials'],
  },
  exercise: {
    featuresNames: ['EID', 'eType', 'MET'],
    featuresTypes: ['VARCHAR(255)', 'VARCHAR(255)', 'FLOAT'],
    pks: ['EID'],
    fks: [],
    references: [],
    referenceTable: [],
  },
  workout: {
    featuresNames: [
      'WID',
      'TID',
      'EID',
      'wDate',
      'Duration',
      'Distance',
      'Location',
      'Feeling',
    ],
    featuresTypes: [
      'VARCHAR(255)',
      'VARCHAR(255)',
      'VARCHAR(255)',
      'DATE',
      'INT',
      'INT',
      'VARCHAR(255)',
      'INT',
    ],
    pks: ['WID'],
    fks: [['TID'], ['EID']],
    references: [['TID'], ['EID']],
    referenceTable: [['trainee'], ['exercise']],
  },
};

module.exports = tablesStruct;
