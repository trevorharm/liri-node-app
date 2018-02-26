// node dependencies defined here
require("dotenv").config();
var keys = require("./keys.js");
var twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');

// define global variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var nodeOperation = process.argv[2];





// command parsing
switch (nodeOperation) {
    case "my-tweets": 
    twit();
    break;

    case "spotify-this-song":
    spot();
    break;

    case "movie-this":
    move();
    break;

    default:
    case "do-what-it-says":
    doit();
    }


// Twitter function
function twit(){
    client.get('statuses/user_timeline', therealtharm1 , function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
};

// Spotify function



// OMDB function


// Default do it function