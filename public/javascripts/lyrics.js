console.log("lyrics line 1 working");

var x = Xray();
var lyrics = '';

  x('http://www.songlyrics.com/adele/hello-lyrics/', '#songLyricsDiv')(function(err, lyricsh) {
    lyrics = lyricsh;
    console.log("line 29 response " + lyrics);
    return lyrics;
  })

  
