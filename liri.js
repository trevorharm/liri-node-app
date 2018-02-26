// node dependencies defined here
require("dotenv").config();
var keys = require("./keys.js");

// define global variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);