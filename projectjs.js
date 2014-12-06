var input1;
var accessMeLater;
var search;
var instaLater;
  
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
var instaUrl = "https://api.instagram.com/v1/media/popular?client_id=c1fc8879f92a41fb962d9bbe6e716206"
    
$(document).ready(function() {  
 
  $("form").submit(function() {
    
    $.get(instaUrl, function(instaResponse) { 
      instaLater = instaResponse;
      console.log(instaLater);
    });

    search = $("input.input1-search").val();
    var flickrUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text="+search;
    console.log(flickrUrl); 

    $.get(flickrUrl, function(response) { 
      accessMeLater = response;
          
      for (var i=0; i<20; i++) {
          var photoUrl = buildFlickrUrl(response.photos.photo[i]);
          $("img.player").eq(i).attr('src', photoUrl);
          $("img.insta").eq(i).attr('src', photoUrl);
      }
    
    });
    });  

    function moveleft(){
         plane.css('left', startPos);
         plane.animate({left: 10}, 7000, 'linear')
       };
       
        var screenWidth = $(document).width();
        var startPos = screenWidth;
        var plane = $('#plane')
        moveleft();
        //setInterval(function() {
        //  moveleft();
        //}, 9000);

    function moveright(){
         plane2.css('right', startPos);
         plane2.animate({right: -7}, 7000, 'linear')
       };
       
        var screenWidth = $(document).width();
        var startPos = screenWidth;
        var plane2 = $('#plane2')
        moveright();
        //setInterval(function() {
        //  moveleft();
        //}, 9000);


  $("#btnSubmit").click(function(){
        location.reload();
    });    
  
  $("form").submit(function() {
    input1 = $(".input1-search").val() || "Default: San Francisco"; // Again, use a default name.
    $(".location-name").text("Pictures of " + input1);

    // Now, hide the setup screen and show the board!
    $(".setup-screen").hide();
    $(".board").show();

    return false; // Make sure the form doesn't submit
  });

  
});
