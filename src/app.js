let moviesArray = []

fetch('https://ghibliapi.herokuapp.com/films/')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    moviesArray = myJson
    showMovies(myJson)
});

let movieList = document.querySelector(".movies")
let searchInput = document.querySelector("#search")
searchInput.addEventListener("keyup",search)

function showMovies(moviesArray){
    
    if(moviesArray.length == 0){
        let movieItem = document.createElement('div');
        movieItem.innerHTML= "Nada =("
        movieList.appendChild(movieItem)
        return false
    }
    moviesArray.sort( (a,b)=> b.rt_score - a.rt_score)

    moviesArray.forEach(movie => {
        let movieItem = document.createElement('div');
        movieItem.classList.add("col-md-3")
        movieItem.classList.add("col-xs-12")
        movieItem.innerHTML = createCard(movie)

        movieList.appendChild(movieItem)
    });
}   

function search(){
    let filtered = filterItems(searchInput.value)

    movieList.innerHTML = ""

    showMovies(filtered)    
}

function createCard(movie){
    let descripcion = movie.description.split(" ")
    let primeraParte =""
    let segundaParte=""
    for (let index = 0; index < 20; index++) {
        const palabra = descripcion[index];
        primeraParte += palabra
    }
    for (let index = 20; index < descripcion.length; index++) {
        const palabra = descripcion[index];
        segundaParte+=palabra
    }
    let cardHtml = `
        <div class="card " >
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${primeraParte}</p>
                <p class="card-text">${segundaParte}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>`
    return cardHtml
}

function filterItems(query) {
    return moviesArray.filter(function(movie) {
        return movie.title.toLowerCase().indexOf(query.toLowerCase()) > -1
    })
}


