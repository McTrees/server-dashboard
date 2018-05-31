//This file will handle authentication
var sqlite3 = require("sqlite3")
var bcrypt = require('bcrypt')
var QRCode = require('qrcode') //For 2fa
var speakeasy = require('speakeasy') //For 2fa
var fns = require("./db_fns.js")
let db = new sqlite3.Database('users.db');

exports.addTwoFactor = function(username) {
  var secret = speakeasy.generateSecret({length: 20})
  QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
    console.log("Scan This:" + image_data + "\n\nB32 Encoded Secret Key: " + secret.base32); // A data URI for the QR code image
  });
}

exports.finalizeTwoFactor = function(username, secretb32, userToken) { //Makes sure user's token matches what we have, then finalizes the two-factor
  if(checkTwoFactor(secretb32, userToken)) {
    fns.setSecret(username, secretb32)
    console.log("Set up!")
  } else {
  //They probably didn't set it up right
  console.log("You didn't set it up right! Try again.")
  //TODO: Make it try again
}
}

exports.checkTwoFactorByUsername = function(username, userToken) {
  fns.retrieveTwoFactor(username).then((secret) => {
    console.log(checkTwoFactor(secret, userToken))
  })
}

function checkTwoFactor(secretb32, userToken) {
  var token = speakeasy.totp({ //Our token
  secret: secretb32,
  encoding: 'base32'
  });
  var verified = speakeasy.totp.verify({
    secret: secretb32,
    encoding: 'base32',
    token: userToken
  })
  return verified;
}

exports.createUser = function(username, password) { // This function creates an account with the specified username and password
  let hash = bcrypt.hashSync(password, 10);
  fns.addUser(username, hash)
}

exports.checkPassword = function(username, password) {
  hash = fns.retrieveHash(username).then((hash) => {
    if (bcrypt.compareSync(password, hash)) {
      // Passwords match
    } else {
      // Passwords don't match
    }
  })
}
