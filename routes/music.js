var express = require('express');
var router = express.Router();
var Xray = require('x-ray');

router.get('/', function(req, res, next) {
  console.log(req.params);
  var x = Xray();
  var lyrics = '';

  x('http://www.songlyrics.com/adele/hello-lyrics/', '#songLyricsDiv')(function(err, lyricsh) {
    lyrics = lyricsh;
  console.log(lyrics);
  })
  res.render('music', {lyrics: lyrics});
});

router.post('/', function(req, res, next) {
  console.log(req.body.artist_search);
  var x = Xray();
  var lyrics = '';
  var artist = req.body.artist_search
  var song = req.body.song_search
  var url = "http://www.songlyrics.com/" + artist + "/" + song + "-lyrics/"

  x(url, '#songLyricsDiv')(function(err, lyrics) {
    lyrics = lyrics;
    console.log("line 27" + lyrics);
    return lyrics;
  })


  console.log("line 30" + lyrics);
  res.render('music', {lyrics: lyrics});
});

module.exports = router;
