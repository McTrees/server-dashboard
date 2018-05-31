//This file will have high-level functions for the DB
var sqlite3 = require("sqlite3")
let db = new sqlite3.Database('users.db');



exports.addUser = function(username, hash, twofactor) { //This function adds a user to the database
  db.run("INSERT INTO users (username, passwordHash) VALUES (?, ?)", username, hash)
}

exports.retrieveHash = function(username) { //This function gets a hash from the database
  return new Promise(function(resolve, reject) {
    db.get(`SELECT passwordHash FROM users WHERE username = '${username}';`, function(err, row) {
      resolve(row["passwordHash"]);
    });
  })
}
