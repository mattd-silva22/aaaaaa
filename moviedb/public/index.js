// selecionando elemetos DOM

const moviesContainer = document.querySelector("#main-container");
const backBtnEl = document.querySelector("#back-page");
const nextBtnEl = document.querySelector("#next-page");
const pageCounterEl = document.querySelector("#page-counter");
const searchBtnEl = document.querySelector("#search-btn");
const searchBarInputEl =  document.querySelector("#search-input");
const logoEl = document.querySelector("#logo-el")

// set primeira pagina
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
};

let switchPage = (query) => {
    clearMovieList()
    getDataFromAPI(query).then( movieList => {
        movieList.results.map(movie => { createMovieCard(movie)})
    })
};

let createMovieCard = (movie)=> {

    let getReleaseDate = (date)=> {

        return(date[0]+date[1]+date[2]+date[3])        
    }
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
                        <p> Release in: ${getReleaseDate(movie.release_date)}</p>
                        <p>Original Language: ${movie.original_language}</p>
                        <p>Score: ${movie.vote_average}</p>
                    </div>
                </div>
    
    
    `

    moviesContainer.append(divEl)


};

let searchMovie = (query)=> {
    clearMovieList()
    getDataFromAPI(query,true).then( movieList => {
        movieList.results.map(movie => { createMovieCard(movie)})
    });
};

let setDOMEvents = ()=> {
    pageCounterEl.innerHTML = pageNumber;

    if(pageNumber <= 1 ) {
        backBtnEl.disabled = true
    };

    backBtnEl.addEventListener("click", ()=>{
        pageNumber--        
        
        
        pageCounterEl.innerHTML = ""
        pageCounterEl.innerHTML = pageNumber
        
        switchPage(pageNumber);

        if(pageNumber == 1 ) {
            backBtnEl.disabled = true
            return
        }
        
        
    });

    nextBtnEl.addEventListener("click", ()=>{
        pageNumber++
        if(pageNumber > 1) {
            backBtnEl.disabled = false
        }
        
        
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
