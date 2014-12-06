var input1;
var accessMeLater;
var search;
var instaLater;
var flickrUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text=";
var instaUrl ="https://api.instagram.com/v1/tags/coffee/media/recent?access_token=9266791.ab103e5.dc9701b2213c45329ae7d044ef273db9";
var locationUrl = "https://api.instagram.com/v1/locations/514276/media/recent?access_token=9266791.ab103e5.dc9701b2213c45329ae7d044ef273db9";
var getlocIDurl = "https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=9266791.ab103e5.dc9701b2213c45329ae7d044ef273db9";
var localID;

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

$(document).ready(function() {  
 
  $("form").submit(function() {
    
    //find instagram location ID from longitude and latitude
    var lon = $("input.input1-long").val();
    console.log(lon);
    var lat = $("input.input1-lat").val();
    console.log(lat);
    getlocIDurl = "https://api.instagram.com/v1/locations/search?lat=" + lat+ "&lng="+lon+"&access_token=9266791.ab103e5.dc9701b2213c45329ae7d044ef273db9"
    console.log("I am getlocIDurl ", getlocIDurl);

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: getlocIDurl, 
        success: function(instaID) {
        localID = instaID.data[0].id;
       
        //have to put all things related to localID in the function

        //find images from instagram location ID
        locationUrl = "https://api.instagram.com/v1/locations/"+localID+"/media/recent?access_token=9266791.ab103e5.dc9701b2213c45329ae7d044ef273db9";

        //ajax call to get images from a location
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: locationUrl, 
            success: function(locationResponse) {
            console.log(locationResponse);
            
            for (var i=0; i<20; i++) {
              var photolocation = locationResponse.data[i].images.standard_resolution.url;
              console.log(photolocation);
              $("img.instaloc").eq(i).attr('src', photolocation);
              } 
            } 
        }); 
    }
    });    

    //fill instagram taged images
    search = $("input.input1-search").val();
    var instaUrl ="https://api.instagram.com/v1/tags/"+search+"/media/recent?access_token=9266791.ab103e5.dc9701b2213c45329ae7d044ef273db9";  

    $.ajax({
       type: "GET",
       dataType: "jsonp",
       url: instaUrl, 
       success: function(instaResponse) {
       console.log(instaResponse);
       var photoInsta = instaResponse.data[0].images.standard_resolution.url;
        
        for (var i=0; i<20; i++) {
          var photoInsta = instaResponse.data[i].images.standard_resolution.url;
          $("img.insta").eq(i).attr('src', photoInsta);
          } 
        } 
    }); 

    //fill flickr tagged images
    flickrUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text="+search;
    
    $.get(flickrUrl, function(response) { 
      accessMeLater = response;
          
      for (var i=0; i<20; i++) {
        var photoUrl = buildFlickrUrl(response.photos.photo[i]);
        $("img.player").eq(i).attr('src', photoUrl);
        }
      });
    });  

    //animation of CSS
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

  //restart 
  $("#btnSubmit").click(function(){
    location.reload();
  });    
  
  //returning name of pictures pulled
  $("form").submit(function() {
    input1 = $(".input1-search").val() || "Default: San Francisco"; // Again, use a default name.
    $(".location-name").text("Pictures of " + input1);

    // Now, hide the setup screen and show the board!
    $(".setup-screen").hide();
    $(".board").show();

    return false; // Make sure the form doesn't submit
  });
});
