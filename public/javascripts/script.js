var goodWordsArray = [];

// remove basic words from array, pushes good words into goodArray[]
function removeBasicWords(array){
  $.each(array, function(i, val){
    if (val !== 'the' && val !== " " && val !== "" && val !== 'of' && val !== 'and' && val !== 'a' && val.length > 1 && val !== "remix" && val !== "digital" && val !== "remastered"){
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
}

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