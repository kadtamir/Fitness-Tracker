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
  }
  deleteAllTables() {
    // Delete tables (reverse order)
    this.deleteTable('workout');
    this.deleteTable('exercise');
    this.deleteTable('trainee');
    this.deleteTable('credentials');
  }
}

const db = new DBBuildup(tablesStruct);
// db.deleteAllTables();
// db.createAllTables();

module.exports = DBBuildup;
