let page = 1;
const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");
const API_KEY = "3d158d589b717997839b5bd8c3c0eda2";
const baseUrl = "https://api.themoviedb.org/3/search/movie";
const rootStyles = document.documentElement.style;

//Logic to get the trending movies

//It depends on the button pressed if the page consulted increases or decreses
btnNext.addEventListener("click", () => {
    if (page <= 1000) {
        page += 1;
        loadMovies();
    }
});

btnPrevious.addEventListener("click", () => {
    if (page > 1) {
        page -= 1;
        loadMovies();
    }
});

//Buttons to change between dark and light mode
const btnDark = document.querySelector(".darkb").addEventListener("click", () => {
    rootStyles.setProperty("--bg-color", "#1d1d1d");
    rootStyles.setProperty("--text-color", "#e0e0e0");
});

const btnWhite = document.querySelector(".whiteb").addEventListener("click", () => {
    rootStyles.setProperty("--bg-color", "#e0e0e0");
    rootStyles.setProperty("--text-color", "#1d1d1d");
});

//Function for request to the API and get the trending movies
const loadMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
        );

        const data = await response.json();
        if (response.status == 200) {
            movies = "";
            data.results.forEach((movie) => {
                movies += `
				<div class="pelicula">
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}
					">	
					<h3 class="titulo">${movie.title}</h3>
				</div>
					`;
            });
            document.getElementById("container").innerHTML = movies;
        } else if (response.status == 401) {
            console.log(
                "Authentication failed: You do not have permissions to access the service"
            );
        } else if (response.status == 404) {
            console.log("Invalid id: The pre-requisite id is invalid or not found");
        } else {
            console.log("Unknown error");
        }
    } catch (error) {
        console.error("Something went wrong:", error);
    }
};

loadMovies();

//Logic to search a movie

//Function that receive the valie of the search and make the subsequent request with that value
const fetchMovies = async (search) => {
    try {
        const response = await fetch(`${baseUrl}?query=${search}&api_key=${API_KEY}`);
        const data = await response.json();
        if (response.status == 200) {
            return data;
        }
    } catch (error) {
        console.error("Something went wrong:", error);
    }
};

const btnSearch = document.getElementById("btnSearch");

//An asynchronous function is created that listens to the click of the search button and reads the value of the input to then make a request with the fetchMovies funtion and we pass that value to bring the array of 20 positions and later we do the foreach to go through it and by each position of the array we create a container of the movie class that contains the image and the title of the movie and we keep that container and then we joined it with the movies variable and finally we obtain the main container and we pass it all the movies as a value through the movies variable

btnSearch.addEventListener("click", async () => {
    let search = document.getElementById("search").value;
    if (search.length > 1) {
        const data = await fetchMovies(search);
        movies = "";
        data.results.forEach((movie) => {
            movies += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}
                    ">
                    <h3 class="titulo">${movie.title}</h3>
                </div>
                    `;
        });
        document.getElementById("container").innerHTML = movies;
        document.querySelector(".pagination").classList.add("hide");
    }
});
