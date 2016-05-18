var express = require('express');
var request = require('request');
var router = express.Router();
var Xray = require('x-ray');


router.get('/', function(req, res, next) {
  res.render('form');
});




router.post('/albums', function(req, res, next) {
  var artistArray = req.body.artistSearch.split(' ');
  var artist = artistArray.join('+');

  console.log("artist: " + artist);


  request.get({ url: "https://api.musixmatch.com/ws/1.1/track.search?q_artist=" + artist + "&apikey=45f030feddac66fcfa2f9e9f659608c4" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        // var albums = JSON.parse(body);
        var tracksArray = JSON.parse(body).message.body.track_list;
        var str = '';

        tracksArray.forEach(function(val, i){
          str += ' ' + val.track.track_name;
        });

        function lyricsStringArray(str){    
          stringArray = String(str).toLowerCase().replace("'", "").replace(/,/g, "").replace(/'/g, "").replace(/\W/g, ' ').split(' ');
          return stringArray;
        };

        var songLyricsArray = lyricsStringArray(str);
        console.log(songLyricsArray);
        res.render('albums', { lyrics: songLyricsArray, artist: artist });
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
    console.log(songLyricsArray);
    res.render('d3', {lyrics: songLyricsArray, artist: artist, song: song});
  });
});

module.exports = router;
