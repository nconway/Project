var player1Name;
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
 
  $("a").click(function() {
    search = $("input.player-1-search").val();
    var flickrUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text="+search;
    console.log(flickrUrl); 

    $.get(flickrUrl, function(response) { 
      accessMeLater = response;
      console.log(response);
      //$("h2").eq(0).text(response.photos.photo[0].secret);
      
      for (var i=0; i<5; i++) {
          var photoUrl = buildFlickrUrl(response.photos.photo[i]);
          //console.log(response.photos.photo[i].id);
          $("img").eq(i).attr('src', photoUrl);
          $("input.player-1-avatar").eq(i).val(photoUrl);
          console.log(photoUrl);
      }
    
    });
    });  

  $("form").submit(function() {
    player1Name = $(".player-1-search").val() || "Default: San Francisco"; // Again, use a default name.
    $(".player-1-name").text(player1Name);

    var url = $("input.player-1-avatar:checked").val();
    $("img.player-1").attr('src', url);

    // Now, hide the setup screen and show the board!
    $(".setup-screen").hide();
    $(".board").show();

    

    return false; // Make sure the form doesn't submit
  });

  
});
