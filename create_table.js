//This file creates the database where accounts are stored.
var sqlite3 = require("sqlite3");
let db = new sqlite3.Database('users.db');


db.run(`CREATE TABLE users (
  username text PRIMARY KEY NOT NULL UNIQUE,
  passwordHash text NOT NULL,
  twofactor text
);`);


db.close();
