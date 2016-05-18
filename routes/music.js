var express = require('express');
var request = require('request');
var router = express.Router();
var Xray = require('x-ray');


router.get('/', function(req, res, next) {
  res.render('form');
});

router.get('/albums', function(req, res, next) {
  var albums;

  request.get({ url: "http://www.omdbapi.com/?t=batman&y=2005&plot=short&r=json" }, function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
                  albums = body;
                  console.log(albums);
                  res.render('albums', { albums: albums });
                 } 
             }); 
});

router.post('/d3lyrics', function(req, res, next) {
  var x = Xray();
  var lyrics = '';

  var artistArray = req.body.artistSearch.split(' ');
  var artist = artistArray.join('+');
  var songArray = req.body.songSearch.split(' ');
  var song = songArray.join('+');

  console.log(req.body);
  console.log(artistArray);

  var url = "http://www.songlyrics.com/" + artist + "/" + song + "-lyrics/"
  
  x(url, '#songLyricsDiv')(function(err, lyricsh) {
    lyrics = lyricsh;

    function lyricsStringArray(str){    
      stringArray = String(str).toLowerCase().replace("'", "").replace(/,/g, "").replace(/'/g, "").replace(/\W/g, ' ').split(' ');
      return stringArray;
    };

    var songLyricsArray = lyricsStringArray(lyrics);
    console.log("post lyrics:   " + songLyricsArray);
    res.render('d3', {lyrics: songLyricsArray, artist: artist, song: song});

  });
});

module.exports = router;
