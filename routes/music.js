var express = require('express');
var router = express.Router();
var Xray = require('x-ray');


router.get('/', function(req, res, next) {
  // console.log(req.body);
  // var x = Xray();
  // var lyrics = '';
  // var artist = req.body.artistSearch
  // var song = req.body.songSearch
  // var url = "http://www.songlyrics.com/" + artist + "/" + song + "-lyrics/"

  // x(url, '#songLyricsDiv')(function(err, lyricsh) {
  //   lyrics = lyricsh;

  //   function lyricsStringArray(str){    
  //     stringArray = String(str).toLowerCase().replace("'", "").replace(/\W/g, ' ').split(' ');
  //     return stringArray;
  //   };

  //   var sa = lyricsStringArray(lyrics);
  //   console.log("get lyrics" + sa);

    res.render('form');
  // });


});

router.post('/d3lyrics', function(req, res, next) {
  console.log(req.body);
  var x = Xray();
  var lyrics = '';
  var artist = req.body.artistSearch
  var song = req.body.songSearch
  var url = "http://www.songlyrics.com/" + artist + "/" + song + "-lyrics/"
  var sa;

  x(url, '#songLyricsDiv')(function(err, lyricsh) {
    lyrics = lyricsh;

    function lyricsStringArray(str){    
      stringArray = String(str).toLowerCase().replace("'", "").replace(/\W/g, ' ').split(' ');
      return stringArray;
    };

    var sa = lyricsStringArray(lyrics);
    console.log("post lyrics" + sa[2]);
    res.render('d3', {lyrics: sa, artist: artist, song: song});

  });
});

module.exports = router;
