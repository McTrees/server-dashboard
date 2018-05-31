//This file will have high-level functions for the DB
var sqlite3 = require("sqlite3")
let db = new sqlite3.Database('users.db');



exports.addUser = function(username, hash) { //This function adds a user to the database
  db.run("INSERT INTO users (username, hash) VALUES (?, ?)", username, hash)
}
