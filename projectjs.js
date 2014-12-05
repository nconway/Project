var input1;
var accessMeLater;
var search;
  
function buildFlickrUrl(p) {
  var url = "https://farm";
  url += p.farm;
  url += ".staticflickr.com/";
  url += p.server;
  url += "/";
  url += p.id;
  url += "_";
  url += p.secret;
  url += ".jpg"

  //var url = "https://farm"+p.farm+".staticflickr.com/"+p.server+"/"+p.id+"_"+p.secret+".jpg";
  return url;
}
var flickrUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text=";
    
$(document).ready(function() {  
 
  $("form").submit(function() {
    search = $("input.input1-search").val();
    var flickrUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text="+search;
    console.log(flickrUrl); 

    $.get(flickrUrl, function(response) { 
      accessMeLater = response;
          
      for (var i=0; i<20; i++) {
          var photoUrl = buildFlickrUrl(response.photos.photo[i]);
          $("img").eq(i).attr('src', photoUrl);
      }
    
    });
    });  

    $("form.second").submit(function() {
    var flickrUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text="+search;
    console.log(flickrUrl); 

    $.get(flickrUrl, function(response) { 
      accessMeLater = response;
          
      for (var i=0; i<20; i++) {
          var photoUrl = buildFlickrUrl(response.photos.photo[i]);
          $("img").eq(i).attr('src', photoUrl);
      }
    
    });
    });

  $("#btnSubmit").click(function(){
        location.reload();
    });    
  
  $("form").submit(function() {
    input1 = $(".input1-search").val() || "Default: San Francisco"; // Again, use a default name.
    $(".location-name").text("Here's what's happening in " + input1);

    // Now, hide the setup screen and show the board!
    $(".setup-screen").hide();
    $(".board").show();

    return false; // Make sure the form doesn't submit
  });

  
});
