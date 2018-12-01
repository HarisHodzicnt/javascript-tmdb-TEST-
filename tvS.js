$(document).ready(()=>{
  axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=38a6fb9c67512590950aabe3f677f0ac")
  .then((response)=>{
var tvShows=response.data.results;
var imgBase="http://image.tmdb.org/t/p/w500";
var content="";
$.each(tvShows, (index, show)=>{
  console.log(show.name);
  if(show.poster_path!==null && index<10)
  {
  imgBase+=show.poster_path;
  content+=`  <div class="col-md-6" style='margin-top:15px; padding:10px;'>
    <div class="text-center">
    <img class="img-responsive" style='width:90%; height:600px;' src='${imgBase}' onClick="showDetails('${show.id}')"/>
    <h4 class="well" style="color:white; margin-top:10px;">${show.name}</h4><h2>${show.vote_average}</h2>
    </div>
    </div>`
imgBase="http://image.tmdb.org/t/p/w500";
  }
  document.getElementById("tvDiv").innerHTML=content;
})
  })
  .catch((error)=>{
    console.log(error);
  })
  $("#search").keyup((value)=>{
    var text=$("#search").val();
    if(text.length<3)
    {
      /*document.getElementById("tvDiv").innerHTML="<div class='container-fluid text-center'><h3>Please use more characters for search, you are using "+text.length+" at the moment.</h3></div>"*/
      return false;
    }
    tvShows(text);
    value.preventDefault();
  })
})

function tvShows(text){

  var imgBase="http://image.tmdb.org/t/p/w500";
  axios.get('https://api.themoviedb.org/3/search/tv?api_key=38a6fb9c67512590950aabe3f677f0ac&query='+text)
  .then((response)=>{
    console.log(response);
    var tvShows=response.data.results;
    var dataShows="";

    $.each(tvShows, (i, show)=>{
      if(show.poster_path!==null)
      {
        imgBase+=show.poster_path;
  dataShows+=`
  <div class="col-md-6" style='margin-top:15px; padding:10px;'>
  <div class="text-center">
  <img class="img-responsive" style='width:90%; height:600px;' src='${imgBase}' onClick="showDetails('${show.id}')"/>
  <h4 class="well" style="color:white; margin-top:10px;">${show.name}</h4><h5>${show.vote_average}</h5>
  </div>
  </div>
  `
  imgBase="http://image.tmdb.org/t/p/w500";
      }
    })
    document.getElementById("tvDiv").innerHTML=dataShows;
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

/*MOVIE DETAILS*/
function showDetails(e){
  sessionStorage.setItem("showId", e);
  window.open("show.html");
  return false;
}

function aboutShow(){
  var id=sessionStorage.getItem("showId");
  var tvShowsDetailsText="";
  axios.get('https://api.themoviedb.org/3/tv/'+id+'?api_key=38a6fb9c67512590950aabe3f677f0ac')
  .then((response)=>{
    var img="http://image.tmdb.org/t/p/w500"+response.data.poster_path;
     tvShowsDetailsText=`
     <div class="container jumbotron"><button onClick="goBack()"><< Back</button><div class="text-center"><img class="img-responsive"' style="height:500px;" src='${img}')"/>
</div><h3 style="margin-top:20px;">${response.data.name}</h3><h5>${response.data.overview}</h5></div>
     `
     document.getElementById("tvShowsDetails").innerHTML=tvShowsDetailsText;
  })
  .catch((error)=>{
    document.getElementById("tvDiv").innerHTML=error;
  })
}

function goBack(text){
  window.close();
  /*I COULD NOT FIND ANY BETTER SOLUTION FOR GOING ON MAIN PAGE ... */
}
