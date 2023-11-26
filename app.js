let pagina=1;
const btnAnterior=document.getElementById("btnAnterior");
const btnSiguiente=document.getElementById("btnSiguiente");

btnSiguiente.addEventListener('click', ()=>{
	if (pagina<=1000) {		
		pagina+=1;
		cargarPelis();
	}
})

const rootStyles=document.documentElement.style;

const btnDark=document.querySelector(".darkb").addEventListener("click", ()=>{
	rootStyles.setProperty("--bg-color", "#1d1d1d")
	rootStyles.setProperty("--text-color", "#e0e0e0")
})

const btnWhite=document.querySelector(".whiteb").addEventListener("click", ()=>{
	rootStyles.setProperty("--bg-color", "#e0e0e0")
	rootStyles.setProperty("--text-color", "#1d1d1d")
})


btnAnterior.addEventListener('click', ()=>{
	if (pagina>1) {
		pagina-=1;
		cargarPelis();
	}
})

const cargarPelis=async()=>{
	try {
		const respuesta=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3d158d589b717997839b5bd8c3c0eda2&page=${pagina}`)
		
		const datos=await respuesta.json();
		
		if (respuesta.status==200) {
			peliculas='';
			datos.results.forEach(pelicula=> {
				peliculas+=`
				<div class="pelicula">
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}
					">	
					<h3 class="titulo">${pelicula.title}</h3>
				</div>
					`;
			});
			document.getElementById('contenedor').innerHTML=peliculas;
				
		}else if (respuesta.status==401) {
			console.log("la llave esta mal")		
		}else if (respuesta.status==404) {
			console.log("la pelicula no existe")		
		}else{
			console.log("error desconocido")
		}

	} catch (error) {
		console.log(error)
		
	}
	}
cargarPelis();