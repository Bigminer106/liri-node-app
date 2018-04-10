require('dotenv').config();
const keys = require('./assets/keys.js');
const fs = require('fs');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const command = process.env[2];
const query = process.env.slice(3);
var result;

fs.appendFile('log.txt', result, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }

  switch (command) {
    case 'my-tweets':
      let resultArray = [];
      const queryURL = `https://www.twitter.com/bigminer106/tweets&appid=${keys.twitter}&limit=20`;
      resultArray.push(/* tweets */)
      result = resultArray;
      console.log(result);
      break;

    case 'spotify-this-song':
      const queryURL = `https://www.spotify.com/?q=${query}&appid=${keys.spotify}`;
      result = [];
      result.push(songInfo);
      console.log(result);
      break;

    case 'movie-this':
      const queryURL = `https://www.omdbapi.com?q=${query}&appid=trilogy`;
      // result = OMDB info
      console.log(result);
      break;

    // case 'do-what-it-says':
    //   // result = random.txt info
    //   console.log(result);
    //   break;
  
    default:
      break;
  };
})