'use strict';
const Server = require('./serverConfig');
const tablesStruct = require('./tablesStruct');

class DBBuildup extends Server {
  constructor(tables, user, password, host) {
    super(user, password, host);
    super.connectToServer();
    super.connectToServerDB('fitness');
    this.tables = tables;
  }
  createAllTables() {
    this.deleteAllTables();

    // Create all tables at once
    for (const table in tablesStruct) {
      const {
        featuresNames,
        featuresTypes,
        pks,
        fks,
        referenceTable,
        references,
      } = tablesStruct[table];
      this.createTable(
        table,
        featuresNames,
        featuresTypes,
        pks,
        fks,
        referenceTable,
        references
      );
    }
    this.initializeExercises();
  }
  deleteAllTables() {
    // Delete tables (reverse order)
    this.deleteTable('workout');
    this.deleteTable('exercise');
    this.deleteTable('trainee');
    this.deleteTable('credentials');
  }
  initializeExercises() {
    this.insertDataToTable(
      'exercise',
      tablesStruct.exercise.featuresNames,
      tablesStruct.exercise.featuresTypes,
      [
        [1, 'Walking', 3.3],
        [2, 'Running', 12.5],
        [3, 'Swimming ', 12],
        [4, 'Tennis', 7],
        [5, 'Football', 10],
        [6, 'Basketball', 8],
        [7, 'Volleyball', 8],
      ]
    );
  }
}

const db = new DBBuildup(tablesStruct);
// db.deleteAllTables();
// db.createAllTables();

module.exports = DBBuildup;
