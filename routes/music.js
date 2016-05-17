var express = require('express');
var router = express.Router();
var Xray = require('x-ray');


router.get('/', function(req, res, next) {
  res.render('form');
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
  var sa;

  x(url, '#songLyricsDiv')(function(err, lyricsh) {
    lyrics = lyricsh;

    function lyricsStringArray(str){    
      stringArray = String(str).toLowerCase().replace("'", "").replace(/,/g, "").replace(/'/g, "").replace(/\W/g, ' ').split(' ');
      return stringArray;
    };

    var sa = lyricsStringArray(lyrics);
    console.log("post lyrics:   " + sa);
    res.render('d3', {lyrics: sa, artist: artist, song: song});

  });
});

module.exports = router;
