// Require statements
const keys = require('./assets/keys.js');
require('dotenv').config();
const fs = require('fs');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');

// API Keys
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

// Convert process.env object to array
const arr = Object.keys(process.env).map(key => {
  return process.env[key];
});

// command & query constants
const command = process.env[2];
const query = arr.slice(3);

// Result constant
const result = '';

// These console.logs work, but not the way I thought they did.
// console.log(spotify);
// console.log(client);

if (command === 'my-tweets') {
  console.log('Oi, Twitter...'); // Sanity Check; not working
  let urlTweet = `https://www.twitter.com/bigminer106/tweets&appid=${keys.twitter}&limit=20`;
  
  request(urlTweet, (err, res) => {
    if (err) {
      throw err;
    } else if (!err && res.statusCode === 200) {
      fs.appendFile('log.txt', client, 'utf8', (err) => {
        if (err) throw err;
        console.log('Written!');
      });
    }
  });
} else if (command === 'spotify-this-song') {
  console.log('How about some tunes?'); // Sanity Check; not working
  let urlSpot = `https://www.spotify.com/?q=${query}&appid=${keys.spotify}`;
  
  request(urlSpot, (err, res) => {
    if (err) {
      throw err;
    } else if (!err && res.statusCode === 200) {
      fs.appendFile('log.txt', spotify.data, 'utf8', (err) => {
        if (err) throw err;
        console.log('Written!');
      });
    }
  });
} else if (command === 'movie-this') {
  console.log('Movie Night!'); // Sanity Check; not working
  let urlOMDB = `https://www.omdbapi.com?q=${query}&appid=trilogy`;
    
  request(urlOMDB, (err, res) => {
    if (err) {
      throw err;
    } else if (!err && res.statusCode === 200) {
      fs.appendFile('log.txt', result, 'utf8', (err) => {
        if (err) throw err;
        console.log('Written!');
      });
    }
  })
} else if (command === 'do-what-it-says') {
  console.log('Doing it...'); // Sanity Check; not working
  fs.readFile('./assets/random.txt', 'utf8', err => {
    if (err) {
      throw err;
    } else {
      fs.appendFile('log.txt', result, 'utf8', (err) => {
        if (err) throw err;
        console.log('Written!');
      });
    }
  });
};
