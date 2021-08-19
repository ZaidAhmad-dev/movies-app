// Adding my tmdb movie api url
const tmdb_api_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const form = document.getElementById("form");
const search = document.getElementById("search");

// Initially getting the movies
getMovies(tmdb_api_url);

// Adding async function to fetch data from tmdb api
async function getMovies(url) {
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  showMovies(json.results);
  
}

function showMovies(movies) {

  // Clearing main content initally
  const main = document.getElementById("movies");
  main.innerHTML = "";

  movies.forEach(movie => {

    // Dynamically showing the content on HTML page
    document.getElementById("movies").innerHTML += `
      <div class="movie">
                <div class="movie-info">
                    <div class="movie-poster">
                        <img src=${IMGPATH + movie.backdrop_path} />
                    </div>
                    <div class="movie-title">
                        <h2>${movie.title}</h2>
                        <p>
                            <span class="movie-year">${movie.release_date}</span>
                            <span class="${getClassByRate(movie.vote_average)} movie-rating">${movie.vote_average}</span>
                        </p>
                    </div>
                    <div class="movie-description">
                        <h4>Overview:</h4>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            </div>
      `;
    
      function getClassByRate(rate) {
        if (rate >= 7.5) {
          return "green";
        } else if (rate >= 5) {
          return "orange";
        } else {
          return "red";
        }
      }

      // Displaying all the movies flex-box style
      document.getElementById("movies").classList.add("flex-box");

  });

  return json.results[0].movie_results;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value;
  console.log(searchTerm);
  const searchUrl = SEARCHAPI + searchTerm;

  if(searchTerm.length > 0) {
    console.log(searchUrl);
    getMovies(searchUrl);
    search.value = "";
  }
});