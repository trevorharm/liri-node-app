// node dependencies defined here
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');

// define global variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);