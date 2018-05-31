//This file will have high-level functions for the DB
var sqlite3 = require("sqlite3")
let db = new sqlite3.Database('users.db');



exports.addUser = function(username, hash, twofactor) { //This function adds a user to the database
  if(!twofactor) {
    twofactor = 'x'
  }
  db.run("INSERT INTO users (username, hash) VALUES (?, ?)", username, hash)
}
