var express = require('express');
var request = require('request');
var router = express.Router();
var Xray = require('x-ray');
var analyze = require('Sentimental').analyze;
var positivity = require('Sentimental').positivity;
var negativity = require('Sentimental').negativity;

//GET form route
router.get('/', function(req, res, next) {
  res.render('form');
});

//POST to hit musixmatch API
router.post('/titles', function(req, res, next) {
  artistArray = req.body.artistSearch.split(' ');
  artist = artistArray.join('+');

  request.get({ url: "https://api.musixmatch.com/ws/1.1/track.search?q_artist=" + artist + "&page_size=100&apikey=45f030feddac66fcfa2f9e9f659608c4" }, function(error, response, body) { 
      if (!error && response.statusCode == 200) { 
        tracksArray = JSON.parse(body).message.body.track_list;

        pic = tracksArray[0].track.album_coverart_100x100
        artistPic = (pic == "http://s.mxmcdn.net/images/albums/nocover.png") ? tracksArray[1].track.album_coverart_100x100 : tracksArray[0].track.album_coverart_100x100

        titlesString = '';

        tracksArray.forEach(function(val){
          titlesString += ' ' + val.track.track_name;
        });

        function lyricsStringArray(string){    
          stringArray = titlesString.replace("'", "").replace(/,/g, "").replace(/'/g, "").replace(/\W/g, ' ').split(' ');
          return stringArray;
        };

        var songLyricsArray = lyricsStringArray(titlesString);
        res.render('titles', { lyrics: songLyricsArray, artist: artist, pic: artistPic });
      } 
  }); 
});

router.post('/lyrics', function(req, res, next) {
  x = Xray();
  artistArray = req.body.artistSearch.split(' ');
  artist = artistArray.join('+');
  songArray = req.body.songSearch.split(' ');
  song = songArray.join('+');

  url = "http://www.songlyrics.com/" + artist + "/" + song + "-lyrics/"
  
  x(url, '#songLyricsDiv')(function(err, lyrics) {
    sentiResults = analyze(lyrics);
    console.log(sentiResults.positive.words);    
    songLyricsArray = lyrics.replace("'", "").replace(/,/g, "").replace(/'/g, "").replace(/\W/g, ' ').split(' ');
    res.render('lyrics', {
      lyrics: songLyricsArray, 
      artist: artist, 
      song: song, 
      posWordsString: sentiResults.positive.words, 
      posScore: sentiResults.positive.score,
      negWordsString: sentiResults.negative.words, 
      negScore: sentiResults.negative.score,
      overallScore: sentiResults.score
    });
  });
});

module.exports = router;
