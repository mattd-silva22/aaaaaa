// selecionando elemetos DOM
const moviesContainer = document.querySelector("#main-container");
let backBtnEl = document.querySelector("#back-page");
let nextBtnEl = document.querySelector("#next-page");
let pageCounterEl = document.querySelector("#page-counter");
let searchBtnEl = document.querySelector("#search-btn");
let searchBarInputEl =  document.querySelector("#search-input");
let logoEl = document.querySelector("#logo-el")



// set primiera pagina
let defaultPage = 1;
let pageNumber = defaultPage;

//funçoes 


async function getDataFromAPI(query,isSearch) {

    if(isSearch) {
        let tempUrl =  `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${query}`
        let res = await fetch(tempUrl);
        let data = await res.json();
    
        return data 
    }

    let tempUrl =  `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${query}`
    //let url = `/movie-db/${page}`
    let res = await fetch(tempUrl);
    let data = await res.json();

    return data
  };

let clearMovieList = ()=> {
    moviesContainer.innerHTML = "";
}

let switchPage = (query) => {
    clearMovieList()
    getDataFromAPI(query).then( movieList => {
        movieList.results.map(movie => { createMovieCard(movie)})
    })
};

let createMovieCard = (movie)=> {


    let getPoster = ()=> {
        if(!movie.poster_path) {
            return "./assets/default-poster.png" 
        } else {
            return `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
    }
    let divEl = document.createElement("div")
    divEl.classList.add("movie-item")


    divEl.innerHTML = `
                
                <img src="${getPoster()}" alt="" class="film-poster">
                <div class="movie-item-text-area">

                    <div class="movie-title-area">
                        <p class="movie-title">${movie.title}</p>
                        <p class="movie-title-original">${movie.original_title}</p>
                    </div>
                   
                    <p class="sinopse">${movie.overview}</p>
                    <div class="movie-info">
                        <p> Release in: ${movie.release_date}</p>
                        <p>Original Language: ${movie.original_language}</p>
                        <p>Score: ${movie.vote_average}</p>
                    </div>
                </div>
    
    
    `

    moviesContainer.append(divEl)


};

let searchMovie = (movieName)=> {
    clearMovieList()
    getDataFromAPI(movieName,true).then( movieList => {
        movieList.results.map(movie => { createMovieCard(movie)})
    });
};

let setDOMEvents = ()=> {
    pageCounterEl.innerHTML = pageNumber;

    if(pageNumber <= 1 ) {
        backBtnEl.disabled = true
    };

    backBtnEl.addEventListener("click", ()=>{
        if(pageNumber <= 1 ) {
            backBtnEl.disabled = true
            return
        }
        pageNumber--
        pageCounterEl.innerHTML = ""
        pageCounterEl.innerHTML = pageNumber
        switchPage(pageNumber);
        console.log(pageNumber);
    });

    nextBtnEl.addEventListener("click", ()=>{
        if(pageNumber > 1) {
            backBtnEl.disabled = false
        }
        pageNumber++
        pageCounterEl.innerHTML =""
        pageCounterEl.innerHTML = pageNumber
        switchPage(pageNumber);
        

    });




    searchBtnEl.addEventListener("click",()=>{
        let query = searchBarInputEl.value.trim()
        if(!query) {
            alert("não deixar campo em branco")
            return
        }
        searchBarInputEl.value = "";
        searchMovie(query)
    })


    logoEl.addEventListener("click",()=>{
        clearMovieList()
        switchPage(defaultPage)
    })

};





// add eventos a DOM

setDOMEvents()

//primeira chamda api

switchPage(defaultPage)
