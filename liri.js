// node dependencies defined here
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require("fs");

// define global variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var nodeOperation = process.argv[2];


// Node Command Parsing Switch Statements
switch (nodeOperation) {
    case "my-tweets":
        twit();
        break;

    case "spotify-this-song":
        spot();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doit();
        break;
    // Give the end user instructions on how to use Liri
    default: console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +
        "1. my-tweets 'any twitter name' " + "\r\n" +
        "2. spotify-this-song 'any song name' " + "\r\n" +
        "3. movie-this 'any movie name' " + "\r\n" +
        "4. do-what-it-says." + "\r\n" +
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
}

// My-tweets Function
function twit() {
    var params = { screen_name: 'therealtharm1' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                //console.log(response); // Show the full response in the terminal
                var twitterResults =
                    "@" + tweets[i].user.screen_name + ": " +
                    tweets[i].text + "\r\n" +
                    tweets[i].created_at + "\r\n" +
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
            }
        } else {
            console.log("Error :" + error);
            return;

        }
    });
};

// Spotify-This-Song Function
function spot(songInput) {
    var songInput = process.argv[3];
    if (songInput == null) {
        songInput = "The Sign";
    }
    spotify.search({ type: 'track', query: songInput }, function (err, data) {
        if (!err) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                        "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                        "Song: " + songInfo[i].name + "\r\n" +
                        "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                        "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                        "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                }
            }
        } else {
            console.log("Error :" + err);
            return;
        }
    });
};

// Movie-this Function
function movie() {
    var movieInput = process.argv[3];
    if (movieInput == null) {
        movieInput = "mr nobody";
    }
    request("http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal
            var movieResults =
                "------------------------------ begin ------------------------------" + "\r\n"
            "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +

                "------------------------------ fin ------------------------------" + "\r\n";
            console.log(movieResults);
        } else {
            console.log("Error :" + error);
            return;
        }
    });
};

//Do-What-It-Says Function
function doit() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            doItData = data.split(",");
            spot(doItData[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};