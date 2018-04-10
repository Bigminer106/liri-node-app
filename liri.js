require('dotenv').config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const fs = require('fs');
const command = process.env.slice(2);

fs.appendFile('log.txt', result, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }

  switch (command) {
    case 'my-tweets':
      const queryURL = `https://www.twitter.com`;
      const result;
      // result += last 20 tweets
      // console.log(tweets);
      break;

    case 'spotify-this-song':
      const queryURL = `https://www.spotify.com`;
      const result;
      // result += song info
      // console.log(song);
      break;

    case 'movie-this':
      const queryURL = `https://www.omdb.com`;
      const result;
      // result += OMDB info
      // console.log(movie);
      break;

    case 'do-what-it-says':
      const result;
      // result += random.txt
      // console.log(random.txt);
      break;
  
    default:
      break;
  };
})