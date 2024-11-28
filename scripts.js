let page = 1;
const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");
const API_KEY = "3d158d589b717997839b5bd8c3c0eda2";
const baseUrl = "https://api.themoviedb.org/3/search/movie";
const rootStyles = document.documentElement.style;

//Logic to get the trending movies
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
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}&language=es`
        );

        const data = await response.json();
        if (response.status == 200) {
            movies = "";
            data.results.forEach((movie) => {
                movies += `
                <div class="pelicula" data-id="${movie.id}">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    <h3 class="titulo">${movie.title}</h3>
                    <div class="description" id="desc-${movie.id}">${movie.overview}</div> <!-- Description in Spanish -->
                </div>
                `;
            });
            document.getElementById("container").innerHTML = movies;
        } else {
            console.error("Error: " + response.status);
        }
    } catch (error) {
        console.error("Something went wrong:", error);
    }
};

loadMovies();

// Logic to search a movie
const fetchMovies = async (search) => {
    try {
        const response = await fetch(`${baseUrl}?query=${search}&api_key=${API_KEY}&language=es`);
        const data = await response.json();
        if (response.status == 200) {
            return data;
        }
    } catch (error) {
        console.error("Something went wrong:", error);
    }
};

const btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", async () => {
    let search = document.getElementById("search").value;
    if (search.length > 1) {
        const data = await fetchMovies(search);
        movies = "";
        data.results.forEach((movie) => {
            movies += `
                <div class="pelicula" data-id="${movie.id}">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    <h3 class="titulo">${movie.title}</h3>
                    <div class="description" id="desc-${movie.id}">${movie.overview}</div> <!-- Description in Spanish -->
                </div>
                `;
        });
        document.getElementById("container").innerHTML = movies;
        document.querySelector(".pagination").classList.add("hide");
    }
});
