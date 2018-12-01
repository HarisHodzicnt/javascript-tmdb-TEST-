$(document).ready(()=>{
  axios.get("https://api.themoviedb.org/3/discover/movie?api_key=38a6fb9c67512590950aabe3f677f0ac&release_date.gte=1900-03-01&popularity.gte=10000&vote_count.gte=1000&vote_average.gte=8.4&sort_by=vote_average.desc")
  .then((response)=>{
var movies=response.data.results;
var imgBase="http://image.tmdb.org/t/p/w500";
var content="";
$.each(movies, (index, movie)=>{
  if(movie.poster_path!==null && index<10)
  {
  imgBase+=movie.poster_path;
  content+=`  <div class="col-md-6" style='margin-top:15px; padding:10px;'>
    <div class="text-center">
    <img class="img-responsive" style='width:90%; height:600px;' src='${imgBase}' onClick="movieDetails('${movie.id}')"/>
    <h4 class="well" style="color:white; margin-top:10px;">${movie.title}</h4><h2>${movie.vote_average}</h2>
    </div>
    </div>`
imgBase="http://image.tmdb.org/t/p/w500";
  }
  document.getElementById("moviesDiv").innerHTML=content;
})
  })
  .catch((error)=>{
    console.log(error);
  })
  $("#search").keyup((value)=>{

    var text=$("#search").val();
    if(text.length<3)
    {
      /*document.getElementById("moviesDiv").innerHTML="<div class='container-fluid text-center'><h3>Please use more characters for search, you are using "+text.length+" at the moment.</h3></div>"*/
      return false;
    }
    movies(text);
    value.preventDefault();
  })
})

function movies(text){

  var imgBase="http://image.tmdb.org/t/p/w500";
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=38a6fb9c67512590950aabe3f677f0ac&query='+text)
  .then((response)=>{
    console.log(response);
    var movies=response.data.results;
    var dataMovies="";

    $.each(movies, (i, movie)=>{
      if(movie.poster_path!==null)
      {
        imgBase+=movie.poster_path;
  dataMovies+=`
  <div class="col-md-6" style='margin-top:15px; padding:10px;'>
  <div class="text-center">
  <img class="img-responsive" style='width:90%; height:600px;' src='${imgBase}' onClick="movieDetails('${movie.id}')"/>
  <h4 class="well" style="color:white; margin-top:10px;">${movie.title}</h4><h5>${movie.vote_average}</h5>
  </div>
  </div>
  `
  imgBase="http://image.tmdb.org/t/p/w500";
      }
    })
    document.getElementById("moviesDiv").innerHTML=dataMovies;
    if(response.data.results.length==0)
    {
      document.getElementById("moviesDiv").innerHTML='<div class="container text-center"><h1>Nothing Found It seems we can’t find what you’re looking for.</h1></div>';
             var focusedElement;
       $(document).on('click', 'input', function () {
               if (focusedElement == this) return; //already focused, return so user can now place cursor at specific point in input.
                 focusedElement = this;
                 setTimeout(function () { focusedElement.select(); }, 50); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.
             });
    }
  })
  .catch((error)=>{
  })
}

/*TV Shows DETAILS*/
function movieDetails(e){
  sessionStorage.setItem("movieId", e);
  window.open("movie.html");
  return false;
}

function aboutMovie(){
  var id=sessionStorage.getItem("movieId");
  var movieDetailsText="";
  axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=38a6fb9c67512590950aabe3f677f0ac')
  .then((response)=>{
    var img="http://image.tmdb.org/t/p/w500"+response.data.poster_path;
     movieDetailsText=`
     <div class="container jumbotron"><button onClick="goBack()"><< Back</button><div class="text-center"><img class="img-responsive"' style="height:500px;" src='${img}')"/>
</div><h3 style="margin-top:20px;">${response.data.title}</h3><h5>${response.data.overview}</h5></div>
     `
     document.getElementById("movieDetails").innerHTML=movieDetailsText;
  })
  .catch((error)=>{
    document.getElementById("moviesDiv").innerHTML=error;
  })
}

function goBack(text){
  window.close();
  /*I COULD NOT FIND ANY BETTER SOLUTION FOR GOING ON MAIN PAGE ... */
}
