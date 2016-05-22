var goodWordsArray = [];

// remove basic words from array, pushes good words into goodArray[]
function removeBasicWords(array){
  var badWordsArray = ['the', " ", "", 'of', 'and', 'a', "remix", "digital", "remastered"];

  array.forEach(function(val){
    if (badWordsArray.indexOf(val) == -1 && val.length > 1) {
      goodWordsArray.push(val);
    }
  });
  goodWordsArray = sortWordFrequency(count(goodWordsArray));
};

// grabs each track title, makes a long string, then an array of words
function titlesStringArray(lyrics){    
  stringArray = lyrics.toLowerCase().replace(/\W/g, ' ').split(' ');
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
};

var makeShitHappen = function(){
  // Using Papa Parse to convert goodWordsArray to csv, setting headers
  var csv = Papa.unparse({
    fields: ["name", "count"],
    data: goodWordsArray
  });

  renderBubbles(csv); //this function is in vis.js
};

titlesStringArray(lyrics);
makeShitHappen();


//SENTIMENT CODE
$(window).load(function () {
  console.log(lyrics);

  if (lyrics.indexOf('GOOG_FIXURL_LANG') > -1){
    console.log("redirect");
  }

  var posColor = "#3fb618";
  var negColor = "#ff0039";

  $('.bubble-label-name').each(function(index, val) {
    if (posWords.indexOf($(this).text()) > -1) {
      var parentAttr = $(this).parent().attr('href');
      $('.bubble-node').each(function(){
        if ($(this).attr('href') == parentAttr){
          $(this).css("fill", posColor)
        }
      });
    } else if(negWords.indexOf($(this).text()) > -1) {
      var parentAttr = $(this).parent().attr('href');
      $('.bubble-node').each(function(){
        if ($(this).attr('href') == parentAttr){
          $(this).css("fill", negColor)
        }
      });
    }
  });

  // console.log(overallScore);

  if (parseInt(overallScore) > -1) {
    $('#vis').addClass('pos');
    $('#overall').css('color', posColor);
    $('#songTitle').css('color', posColor);
  } else {
    $('#vis').addClass('neg');
    $('#overall').css('color', negColor);
    $('#songTitle').css('color', negColor);
  }

  //remove duplicate words from sentiment pos/neg words arrays
  function editArray(array){
    var editedArray = [];
    
    array.forEach(function(val){
      if (editedArray.indexOf(val) == -1){
        editedArray.push(val);
        // console.log(val);      
      }
    });
    return editedArray;
  };

  $('#posWords').text(editArray(posWords));
  $('#negWords').text(editArray(negWords));

  $('#container').fadeIn(700);
  



});