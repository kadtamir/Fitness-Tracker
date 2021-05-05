'use strict';
const mysql = require('mysql');
const config = require('./private');
// config looks like this:
// const config = {
//   user: 'user',
//   password: 'password',
//   host: 'host',
//   database: 'database',
// };

class Server {
  // Server class to build and control the relational DB
  constructor(
    user = config.user,
    password = config.password,
    host = config.host
  ) {
    this.user = user;
    this.password = password;
    this.host = host;
  }

  connectToServer() {
    this.con = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
    });
    console.log('Connected to server');
  }

  showDBs() {
    this.connectToServer();
    this.con.query('SHOW DATABASES', (err, res) => {
      if (err) throw err;
      console.log(res);
    });
  }

  createDB(dbName) {
    this.connectToServer();
    this.deleteDB(dbName);
    this.con.query(`CREATE DATABASE ${dbName.toLowerCase()}`, (err) => {
      if (err) throw err;
      this.db.query(`USE ${dbName}`, (err) => {
        if (err) throw err;
      });
      console.log('Database created');
    });
  }

  deleteDB(dbName) {
    this.con.query(`DROP DATABASE IF EXISTS ${dbName.toLowerCase()}`, (err) => {
      if (err) throw err;
    });
  }

  connectToServerDB(database = config.database) {
    this.db = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: database,
    });
    console.log(`Connected to DB: ${this.db.config.database}`);
  }

  createTable(
    tableName,
    featuresNames = [],
    featuresTypes = [],
    pks = '',
    fks = [],
    referenceTable = [],
    references = []
  ) {
    // Create the table from the input arguments
    let sql = `CREATE TABLE ${tableName.toLowerCase()}(`;
    for (const i in featuresNames) {
      // "in" means keys (in an array the keys are the indices)
      sql += `${featuresNames[i]} ${featuresTypes[i]}, `;
    }
    if (pks.length) {
      sql += 'PRIMARY KEY (';
      for (const pk of pks) {
        // "of" means values
        sql += `${pk}, `;
      }
      sql = sql.slice(0, -2) + ')'; // remove last space and comma, close parenthesis
    }
    if (fks.length) {
      if (Array.isArray(fks[0])) {
        // more than one foreign key
        for (const i in fks) {
          sql += `, FOREIGN KEY (${fks[i][0]}) REFERENCES ${referenceTable[i][0]}(${references[i][0]})`;
        }
      } else {
        // only one foreign key
        sql += `, FOREIGN KEY (${fks[0]}) REFERENCES ${referenceTable[0]}(${references[0]})`;
      }
    }
    sql += ')ENGINE=InnoDB;'; // close the statement and set the engine (makes the fks work)
    this.db.query(sql, (err) => {
      if (err) throw err;
      console.log(`Table ${tableName} created`);
    });
  }

  deleteTable(tableName) {
    this.db.query(`DROP TABLE IF EXISTS ${tableName.toLowerCase()}`, (err) => {
      if (err) throw err;
      console.log(`Table ${tableName} deleted`);
    });
  }

  insertDataToTable(tableName, featuresNames, featuresTypes, values) {
    let sql = `INSERT INTO ${tableName.toLowerCase()} (`;
    featuresNames.forEach((col) => (sql += col + ','));
    sql = sql.slice(0, -1) + ') VALUES ';
    const rows = values.map((row) => {
      return row
        .map((val, index) => {
          if (featuresTypes[index] === 'INT') {
            return parseInt(val);
          }
          if (featuresTypes[index] === 'FLOAT') {
            return parseFloat(val);
          }
          if (featuresTypes[index] === 'VARCHAR(255)') {
            return `"${val}"`;
          }
          return val;
        })
        .join(',');
    });
    rows.forEach((val) => (sql += `(${val}), `));
    sql = sql.slice(0, -2) + ';'; // remove last space and comma, close parenthesis
    this.db.query(sql, (err) => {
      if (err) throw err;
      console.log('Inserted exercises');
    });
  }

  showTables(dbName) {
    this.con.query(`SHOW TABLES IN ${dbName.toLowerCase()}`, (err, res) => {
      if (err) throw err;
      console.log(res);
    });
  }
}

//Initialize DB
const s = new Server();
// Run this line before any other operations
// s.createDB('fitness');
// s.connectToServer();
// s.connectToServerDB('fitness');
// s.showDBs();
// s.showTables('fitness');

module.exports = Server;
