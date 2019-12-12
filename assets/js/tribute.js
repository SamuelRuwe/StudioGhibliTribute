var imageLocation = "./images/";
var imageType = ".png";
var movieData = new Map();

const container = document.getElementById('container');
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
        // console.log(request.responseText);
        var data = JSON.parse(request.response);
        data.forEach(movie => {
          var tempMovie = {
            description: movie.description,
            director: movie.director,
            release_date: movie.release_date
          };
          movieData.set(movie.title, tempMovie);
        })
    }
}

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {

      var movieDetails = movieData.get(movie.title);
      const node = document.createElement('li');
      var textNode = document.createTextNode(movie.title + " (" + movieDetails.release_date + ")");
      node.className += "movie";

      $(node).hover(
       function(){ $(this).addClass('hover') },
       function(){ $(this).removeClass('hover') 
      })

      $(node).click(function() {
        $(".clicked").removeClass("clicked");
        var location = imageLocation + movie.title.replace(/\s/g,'').toLowerCase() + imageType;
        $('#image').attr( { "src": location, onerror: "this.onerror=null;this.src='./images/imagenotfound.png';" });
         $("HTML, BODY").animate({
            scrollTop: 0
          }, 700);
         var movieDescription = movieDetails.description;
         $("#img-caption").text(movieDescription);
         $("#imageTitle").text(movie.title);
         $("#creatorDate").text("Directed by: " + movieDetails.director + " (" + movieDetails.release_date + ")");
         $(".description").remove();
         $(this).addClass("clicked");
        });

      node.appendChild(textNode);
      document.getElementById("movieList").appendChild(node);

    })
  } else {
    alert("Error retriving API data!")
  }
}

request.send();

//create a way to sort by release date and alphabet

