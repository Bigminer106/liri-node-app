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
const result = '';

const obj = process.env;
const arr = Object.keys(obj).map(key => {
  return obj[key];
});

// command & query constants
const command = arr[2];
const query = arr.slice(3);

fs.appendFile('log.txt', result, 'utf8', (err) => {
  if (err) {
    throw err;
  } else if (command === 'my-tweets') {
    console.log('Oi, Twitter...');
    let urlTweet = `https://www.twitter.com/bigminer106/tweets&appid=${client}&limit=20`;
    
    request(urlTweet, (err, res, body) => {
      if (err) {
        throw err;
      } else if (!err && res.statusCode === 200) {
        result = JSON.stringify(body, null, 2);
        fs.writeFile('./log.txt', result, 'utf8', (err) => {
          if (err) {
            throw err;
          };
          console.log('Written!');
        });
      }
    });
  } else if (command === 'spotify-this-song') {
    console.log('How about some tunes?');
    let urlSpot = `https://www.spotify.com/?q=${query}&appid=${spotify}`;
    
    request(urlSpot, (err, res, body) => {
      if (err) {
        throw err;
      } else if (!err && res.statusCode === 200) {
        result = JSON.stringify(body, null, 2);
        fs.writeFile('./log.txt', result, 'utf8', (err) => {
          if (err) {
            throw err;
          };
          console.log('Written!');
        });
      }
    });
  } else if (command === 'movie-this') {
    console.log('Movie Night!');
    let urlOMDB = `https://www.omdbapi.com?q=${query}&appid=trilogy`;
      
    request(urlOMDB, (err, res, body) => {
      if (err) {
        throw err;
      } else if (!err && res.statusCode === 200) {
        result = JSON.stringify(body, null, 2);
        fs.writeFile('./log.txt', result, 'utf8', (err) => {
          if (err) {
            throw err;
          };
          console.log('Written!');
        });
      }
    })
  } else if (command === 'do-what-it-says') {
    console.log('Doing it...');
    fs.readFile('./assets/random.txt', 'utf8', err => {
      if (err) {
        throw err;
      } else {
        fs.writeFile('./log.txt', result, 'utf8', (err) => {
          if (err) {
            throw err;
          }
          console.log('Written!');
        });
      }
    });
  };
});