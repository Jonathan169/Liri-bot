require("dotenv").config();

var keys = require("./keys.js");
var axios= require('axios')
var fs=require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var arg=process.argv[2]
var arg2= process.argv.slice(3).join("-");


if(arg==='search-song'){
spotify.search({ type: 'track', query: arg2 }, function(err, data) {
  if(data===null){
  console.log("\n-------------------------\n",
  "Sorry coud not find song\n",
  "Check Spelling and spacing",
  "\n-------------------------\n")
  }
else{
  if(data.tracks.items[0].preview_url!==null){
  console.log('\nRESULTS\n\n',
  'Artist name: '+data.tracks.items[0].artists[0].name+'\n',
  'Song name : '+data.tracks.items[0].name+'\n',
  'Album Name: '+data.tracks.items[0].album.name+'\n',
  "Preview Url: "+data.tracks.items[0].preview_url+'\n'
  ); 
  }
  else if(data.tracks.items[0].preview_url==null){
  console.log('\nRESULTS\n\n',
  'Artist name: '+data.tracks.items[0].artists[0].name+'\n',
  'Song name : '+data.tracks.items[0].name+'\n',
  'Album Name: '+data.tracks.items[0].album.name+'\n',
  "Preview Url: No preview found \n"); 
  }
}
});

}
else if(arg==="search-concert"){
  arg2= process.argv.slice(3).join("");
  var queryUrl = "https://rest.bandsintown.com/artists/" + arg2 + "/events?app_id=node&date=upcoming";
axios
.get(queryUrl)
.then(function(resp){
  console.log("\n--------------------------------------------")
  var count=0;
for(let i=0;i<resp.data.length;i++){
  if(resp.data[i].datetime){
  var date=resp.data[i].datetime.split("T")[0];
    console.log("\nRESULTS\n\n",
    "Date: "+date+"\n",
    "Venue: "+resp.data[i].venue.name+"\n",
    "longitude: "+resp.data[i].venue.longitude+"\n",
    "latitide: "+resp.data[i].venue.latitude+"\n",
    "--------------------------------------------\n")
    count++;
  }
}
if(count<1){
  console.log("sorry no matches or not on Tour")
}
})
}

else if(arg==='search-movie'){
  var queryUrl =   "http://www.omdbapi.com/?apikey=trilogy&t="+arg2
  axios
  .get(queryUrl)
  .then(function(resp){    
    if(resp.data.Ratings.length>1){
      console.log("\n--------------------------------------------",
      "\nRESULTS\n\n",
      "Title: "+resp.data.Title+"\n",
      "Genre: "+resp.data.Genre+"\n",
      "Realesed: "+resp.data.Released+"\n",
      "IMDb Rating: "+resp.data.imdbRating+"\n",
      "Rotten Tomatoes: "+resp.data.Ratings[1].Value+"\n",
      "Filmed in: "+resp.data.Country+"\n",
      "Original language: "+resp.data.language+"\n",
      "Actors: "+resp.data.Actors+"\n\n",
      "Plot: "+resp.data.Plot+"\n",
      "--------------------------------------------\n")
    }
    else{
      console.log("\n--------------------------------------------",
      "\nRESULTS\n\n",
      "Title: "+resp.data.Title+"\n",
      "Genre: "+resp.data.Genre+"\n",
      "Realesed: "+resp.data.Released+"\n",
      "IMDb Rating: "+resp.data.imdbRating+"\n",
      "Rotten Tomatoes: N/A \n",
      "Filmed in: "+resp.data.Country+"\n",
      "Original language: "+resp.data.language+"\n",
      "Actors: "+resp.data.Actors+"\n\n",
      "Plot: "+resp.data.Plot+"\n",
      "--------------------------------------------\n")
    }
  })
}
else if(arg==='do-what-it-says'){
  fs.readFile("./random.txt","utf8", function(err,data){
    spotify.search({ type: 'track', query: data }, function(err, data) {
      if(data.tracks.items[0].preview_url!==null){
      console.log('\nRESULTS\n\n',
      'Artist name: '+data.tracks.items[0].artists[0].name+'\n',
      'Song name : '+data.tracks.items[0].name+'\n',
      'Album Name: '+data.tracks.items[0].album.name+'\n',
      "Preview Url: "+data.tracks.items[0].preview_url+'\n'
      ); 
      }
      else if(data.tracks.items[0].preview_url==null){
      console.log('\nRESULTS\n\n',
      'Artist name: '+data.tracks.items[0].artists[0].name+'\n',
      'Song name : '+data.tracks.items[0].name+'\n',
      'Album Name: '+data.tracks.items[0].album.name+'\n',
      "Preview Url: No preview found \n"); 
      }
    });
  })
}
