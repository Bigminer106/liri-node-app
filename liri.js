// Require statements
require('dotenv').config();
const keys = require('./assets/keys.js');
const fs = require('fs');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');

// API Keys
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

// command & query constants
const command = process.env[2];
const query = process.env.slice(3);

fs.appendFile('log.txt', result, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }

  switch (command) {
    case 'my-tweets':
      const queryURL = `https://www.twitter.com/bigminer106/tweets&appid=${keys.twitter}&limit=20`;
      // Insert process.env statement to pull latest 20 tweets from Twitter API
      break;

    case 'spotify-this-song':
      const queryURL = `https://www.spotify.com/?q=${query}&appid=${keys.spotify}`;
      // Insert process.env statement to pull the song from Spotify API
      break;

    case 'movie-this':
      const queryURL = `https://www.omdbapi.com?q=${query}&appid=trilogy`;
      // Search OMDB API for the right movie
      break;

    case 'do-what-it-says':
      fs.readFile('random.txt', 'utf8', err => {
        if (err) throw err;
      });
      // Insert process.env statement for LIRI to read the file
      break;
  
    default:
      break;
  };
});