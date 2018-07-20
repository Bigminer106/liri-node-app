// Require statements
const keys = require('./assets/keys.js');
const fs = require('fs');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const request = require('request');
require('dotenv').config();

// API Keys
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

// Command line constants
const nodeArgv = process.argv;
const command = process.argv[2];

// Result variable
var result = '';

for (let i = 3; i < nodeArgv.length; i++) {
  if (i > 3 && i < nodeArgv.length) {
    result = result + "+" + nodeArgv[i];
  } else {
    result = result + nodeArgv[i];
  }
};

var showTweets = () => {
  const screenName = {
    screen_Name: 'Miner_Adam'
  }

  client.get('statuses/user_timeline', screenName, (err, results, res) => {
    console.log(results);
    if (!err) {
      for (let i = 0; i < results.length; i++) {
        var date = results[i].created_at;
        var tweet = `@bigminer106: ${results[i].text}; Created At: ${date.substring(0, 19)}`
        console.log(tweet);
        fs.appendFile('log.txt', tweet, 'utf8', (err, res) => { if (err) throw err; });
      }
    } else {
      throw err;
    };
  });
};

var spotifySong = song => {
  spotify.search({ type: 'track', query: song }, (err, data) => {
    if (!err) {
      for (let i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        var title = songData.name;
        var artist = songData.artists[0].name;
        var album = songData.album.name;
        var preview = songData.preview_url;

        console.log(`Artist: ${artist}`);
        console.log(`Title: ${title}`);
        console.log(`Album: ${album}`);
        console.log(`Preview URL: ${preview}`);
        console.log('-------------------------------------');

        fs.appendFile('log.txt', artist, 'utf8', (err, res) => { if (err) throw err; });
        fs.appendFile('log.txt', title, 'utf8', (err, res) => { if (err) throw err; });
        fs.appendFile('log.txt', album, 'utf8', (err, res) => { if (err) throw err; });
        fs.appendFile('log.txt', preview, 'utf8', (err, res) => { if (err) throw err; });
      }
    } else {
      throw err;
    }
  })
}

var movieData = (movie) => {
  let urlOMDB = `http://www.omdbapi.com/?i=tt3896198&t=${movie}&apikey=trilogy`;

  request(urlOMDB, (err, res, results) => {
    if (!err && res.statusCode === 200) {
      var body = JSON.parse(results);

      console.log(`Title: ${body.Title}`);
      console.log(`Year: ${body.Year}`);
      console.log(`Actors: ${body.Actors}`);
      console.log(`Rotten Tomatoes: ${body.tomatoRating}`);
      console.log(`IMDB Rating: ${body.imdbRating}`);
      console.log(`Country: ${body.Country}`);
      console.log(`Language: ${body.Language}`);
      console.log(`Plot: ${body.Plot}`);

      fs.appendFile('log.txt', body.Title, 'utf8', (err, res) => { if (err) throw err; });
      fs.appendFile('log.txt', body.Year, 'utf8', (err, res) => { if (err) throw err; });
      fs.appendFile('log.txt', body.Actors, 'utf8', (err, res) => { if (err) throw err; });
      fs.appendFile('log.txt', body.tomatoRating, 'utf8', (err, res) => { if (err) throw err; });
      fs.appendFile('log.txt', body.imdbRating, 'utf8', (err, res) => { if (err) throw err; });
      fs.appendFile('log.txt', body.Country, 'utf8', (err, res) => { if (err) throw err; });
      fs.appendFile('log.txt', body.Language, 'utf8', (err, res) => { if (err) throw err; });
      fs.appendFile('log.txt', body.Plot, 'utf8', (err, res) => { if (err) throw err; });
    } else {
      throw err;
    };

    if (movie === 'Mr. Nobody') {
      fs.appendFile('log.txt', 'You haven\'t seen Mr. Nobody?  It\'s on Netflix!  Check it out!', (err, res) => { if (err) throw err; });
    }
  })
};

var doThings = () => {
  fs.readFile('./assets/random.txt', 'utf8', (err, data) => {
    if (!err) {
      var txt = data.split(',');
      spotifySong(txt[1]);
    } else {
      throw err;
    }
  })
};

switch (command) {
  case 'my-tweets':
    showTweets();
  break;

  case 'spotify-this-song':
    spotifySong(result);
  break;

  case 'movie-this':
    if (result) {
      movieData(result);
    } else {
      movieData('Mr. Nobody');
    };
  break;

  case 'do-what-it-says':
    doThings();
  break;

  default:
    console.log('Please insert a command, either: my-tweets, spotify-this-song, movie-this, do-what-it-says');
  break;
};