//This file will handle authentication
var sqlite3 = require("sqlite3")
var bcrypt = require('bcrypt')
var fns = require("./db_fns.js")
let db = new sqlite3.Database('users.db');


function createUser(username, password) { // This function creates an account with the specified username and password
  let hash = bcrypt.hashSync(password, 10);
  fns.addUser(username, hash)
}
