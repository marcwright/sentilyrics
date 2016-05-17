

  // $(function() {
    // var exports = module.exports;
    var search;
    var goodWordsArray = [];

    // event handler that calls the searchArtist function
    $('#artistSearch').on('click', function(e){
      searchArtist(e);     
     });

    // calls the hitAPI function passing in the search param, 
    // also resets the screen for more searces without refresh
    function searchArtist(e){
      e.preventDefault(); //stops page refresh with button click
      search = $('#searchCond').val();
      $('#artist').text('searching for ' + search); //briefly displays during API call
      musixmatchAPIArtistSearch(search); // 
      goodWordsArray = []; //empties out parsed out Array
      $('#lyric').empty(); //empties out lyrics div
    }

    //calls the musixmatch API, returns all tracks by given artist
    function musixmatchAPIArtistSearch(userInput){
      $.ajax({
        type: "GET",
        data: {
            apikey:"45f030feddac66fcfa2f9e9f659608c4",
            page_size: 100,
            // q_track:"back to december",
            q_artist: userInput,
            // f_has_lyrics: 1, //only return results with lyrics
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
        success: function(data) {
          
          parseMusicData(data);  

        } 
      }) //end of AJAX
    } //end of musixmatchAPIArtistSearch function


    // digs into data and parses song titles into an array of words
    function parseMusicData(data){
      var tracksArray = data.message.body.track_list; //each individual track object

      titlesStringArray(tracksArray);    

      // remove basic words from array, pushes good words into goodArray[]
      function removeBasicWords(array){
        $.each(array, function(i, val){
          if (val !== 'the' && val !== " " && val !== "" && val !== 'of' && val !== 'and' && val !== 'a' && val.length > 1 && val !== "remix" && val !== "digital" && val !== "remastered"){
            goodWordsArray.push(val);
          }
        });
      };

      // grabs each track title, makes a long string, then an array of words
      function titlesStringArray(array){    
          var str = '';
          $.each(tracksArray, function(i, val){
            str += ' ' + val.track.track_name
          });
          
          var adeleLyricsString = "Hello, it's me I was wondering if after all these years You'd like to meet, to go over everything They say that time's supposed to heal ya But I ain't done much healing Hello, can you hear me? I'm in California dreaming about who we used to be When we were younger and free I've forgotten how it felt before the world fell at our feet There's such a difference between us And a million miles Hello from the other side I must've called a thousand times to tell you I'm sorry, for everything that I've done But when I call you never seem to be home Hello from the outside At least I can say that I've tried to tell you I'm sorry, for breaking your heart But it don't matter, it clearly doesn't tear you apart anymore Hello, how are you? It's so typical of me to talk about myself I'm sorry, I hope that you're well Did you ever make it out of that town Where nothing ever happened? It's no secret That the both of us are running out of time Hello from the other side I must've called a thousand times to tell you I'm sorry, for everything that I've done But when I call you never seem to be home Hello from the outside At least I can say that I've tried to tell you I'm sorry, for breaking your heart But it don't matter, it clearly doesn't tear you apart anymore Ooooohh, anymore Ooooohh, anymore Ooooohh, anymore Anymore Hello from the other side I must've called a thousand times to tell you I'm sorry, for everything that I've done But when I call you never seem to be home Hello from the outside At least I can say that I've tried to tell you I'm sorry, for breaking your heart But it don't matter, it clearly doesn't tear you apart anymore"
          var adeleLyricsStringFromServer = lyrics;


          stringArray = adeleLyricsStringFromServer.toLowerCase().replace(/\W/g, ' ').split(' ');
          console.log(stringArray);
          removeBasicWords(stringArray);
      };

      //counts frequency of words
      function count(arr){
        return arr.reduce(function(m,e){
          m[e] = (+m[e]||0)+1; 
          return m;
        },{})};

      // sorts words by frequency  
      function sortWordFrequency(obj){
        // convert object into array
        var sortable=[];
        for(var key in obj)
            if(obj.hasOwnProperty(key))
                sortable.push([key, obj[key]]); // each item is an array in format [key, value]

        // sort items by value
        sortable.sort(function(a, b)
        {
          return a[1]-b[1]; // compare numbers
        });
        return sortable.reverse(); // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
      }

      // re-initialize the page
      function reset(){
        $('#artist').empty();
        $('#searchCond').val('');
        $('#artist').append("<p>Here are the frequency of words in " + search + "'s song titles</p>");
        
        
        // prints key/val to browser
        $.each(goodWordsArray, function(i, val){
          $('#lyric').append('<div><strong style="color:red">' + val[1] + ':</strong><span> ' + val[0] + '</span></div>');
        });
      }

      goodWordsArray = sortWordFrequency(count(goodWordsArray));

      var makeShitHappen = function(){
          // Options for the Word Cloud Function below
          var options = {
          list: goodWordsArray,
          // fontWeight: "bold",
          weightFactor: 10,
          // origin: [400,400],
          // shape: "star",
          shuffle: true,
          rotateRatio: .5
        }

        WordCloud(document.getElementById('my_canvas'), options );

        // Using Papa Parse to convert goodWordsArray to csv, setting headers
        var csv = Papa.unparse({
            fields: ["name", "count"],
            data: goodWordsArray
          });

        
        //this code converts the csv back into JSON
        // var arr = csv.split('\n');     

        // var jsonObj = [];
        // var headers = arr[0].split(',');
        // for(var i = 1; i < arr.length; i++) {
        //   var data = arr[i].split(',');
        //   var obj = {};
        //   for(var j = 0; j < data.length; j++) {
        //      obj[headers[j].trim()] = data[j].trim();
        //   }
        //   jsonObj.push(obj);
        // }

        // wordObj = JSON.stringify(jsonObj);
    
        // var csvAgain = Papa.unparse({
        //     fields: ["name", "count"],
        //     data: wordObj,
        //     config: {
        //       delimiter: "\n",  // auto-detect
        //       newline: "",  // auto-detect
        //       quotes: true
        //     }
        //   });
        renderBubbles(csv); //this function is in vis.js
      }
      makeShitHappen();

      reset();
    }
  // });


