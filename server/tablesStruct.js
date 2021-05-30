'use strict';
const tablesStruct = {
  // One object to hold the tables structure with every table's details.
  credentials: {
    featuresNames: ['UID', 'Username', 'Pass', 'isAdmin'],
    featuresTypes: [
      'VARCHAR(255)',
      'VARCHAR(255) UNIQUE',
      'VARCHAR(255) NOT NULL',
      'BOOLEAN DEFAULT FALSE',
    ],
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
      'DATE NOT NULL',
      'VARCHAR(255) NOT NULL',
      'INT NOT NULL',
      'INT NOT NULL',
      'DATETIME',
    ],
    pks: ['TID'],
    fks: ['TID'],
    references: ['UID'],
    referenceTable: ['credentials'],
  },
  exercise: {
    featuresNames: ['EID', 'eType', 'MET'],
    featuresTypes: [
      'INT AUTO_INCREMENT',
      'VARCHAR(255) NOT NULL',
      'FLOAT NOT NULL',
    ],
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
      'Calories',
      'Location',
      'Feeling',
    ],
    featuresTypes: [
      'VARCHAR(255)',
      'VARCHAR(255)',
      'INT',
      'DATETIME NOT NULL',
      'INT NOT NULL',
      'FLOAT NOT NULL',
      'INT NOT NULL',
      'VARCHAR(255) NOT NULL',
      'INT NOT NULL',
    ],
    pks: ['WID'],
    fks: [['TID'], ['EID']],
    references: [['TID'], ['EID']],
    referenceTable: [['trainee'], ['exercise']],
  },
};

module.exports = tablesStruct;
