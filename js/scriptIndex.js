const API_KEY = 'e04b8f3802fae2ce1d6e57c3b5ffa2e3';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMG = 'https://image.tmdb.org/t/p/w200/';

// Obtengo el elemento select para que al cargar la página se seleccione automáticamente el género 'Todas'
let elementoSelect = document.getElementById("menu");
let valorSeleccionado = "todas";
let pagActual = 1;

// ----------------------------------------------------------------------------------------------------------------------------------------
// Agrego un evento de cambio para que se modifiquen las películas depende del género seleccionado
elementoSelect.addEventListener("change", function() {
    // Obtener el valor de la opción seleccionada
    valorSeleccionado = elementoSelect.value;
    // Reinicio la página actual para que al cambiar de género se vuelva automáticamente a la primera página
    pagActual = 1;
    // Llamar a la función para obtener nombres de películas
    obtenerNombresPeliculas(valorSeleccionado, pagActual);
});
// ----------------------------------------------------------------------------------------------------------------------------------------

// Desenfocar el menú de géneros
const menu = document.getElementById('menu');
function blurSelect() {
    menu.blur();
}
menu.addEventListener('change', blurSelect);
menu.addEventListener('click', function() {
    const windowWidth = window.innerWidth;
    // Verificar si el ancho de la ventana es menor que 1024 píxeles antes de ejecutar blurSelect
    if (windowWidth < 1024) {
        blurSelect();
    }
});
// ----------------------------------------------------------------------------------------------------------------------------------------

// Integrar la función buscarPeliculas()
function buscarPeliculas() {
    const input = document.getElementById('inputBuscar').value;
    // Llama a la API de TMDb para buscar películas
    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${input}`)
      .then(response => response.json())
      .then(data => mostrarSugerencias(data.results))
      .catch(error => console.error('Error:', error));
}
// ----------------------------------------------------------------------------------------------------------------------------------------
  
// Integrar la función mostrarSugerencias()
function mostrarSugerencias(results) {
    const listaSugerencias = document.getElementById('sugerencias');
    listaSugerencias.innerHTML = '';
    const input = document.getElementById('inputBuscar').value;
  
    // Agrega el valor actual del campo de entrada como la primera opción si no está vacío
    if (input.trim() !== '') {
      const inputItem = document.createElement('li');
      inputItem.textContent = input;
      listaSugerencias.appendChild(inputItem);
    }
  
    results.forEach(movie => {
      const listItem = document.createElement('li');
      listItem.textContent = movie.title;
      listaSugerencias.appendChild(listItem);
    });
}
// ----------------------------------------------------------------------------------------------------------------------------------------
  
// Agregar eventos al hacer clic en las sugerencias
const listaSugerencias = document.getElementById('sugerencias');
listaSugerencias.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const peliculaSeleccionada = event.target.textContent;
      document.getElementById('inputBuscar').value = peliculaSeleccionada;
      listaSugerencias.innerHTML = ''; // Limpiar las sugerencias después de seleccionar
    }
});
// ----------------------------------------------------------------------------------------------------------------------------------------

// Función para obtener la información de las películas
function obtenerNombresPeliculas(valorSeleccionado, pagActual) {
    let endpoint;
    document.getElementById('pagActual').textContent = `${pagActual}`;
    document.getElementById('pagActual2').textContent = `${pagActual}`;

    const titulo = document.getElementById('generoPeliculas');
    if (valorSeleccionado == "todas") {
        endpoint = '/movie/popular?';
        titulo.innerHTML = `<h1>Todas las películas</h1>`
    }
    else if (valorSeleccionado == "accion") {
        titulo.innerHTML = `<h1>Acción</h1>`
        endpoint = '/discover/movie?&with_genres=28&';
    }
    else if (valorSeleccionado == "aventura") {
        endpoint = '/discover/movie?&with_genres=12&';
        titulo.innerHTML = `<h1>Aventura</h1>`
    }
    else if (valorSeleccionado == "animacion") {
        endpoint = '/discover/movie?&with_genres=16&';
        titulo.innerHTML = `<h1>Animación</h1>`
    }
    else if (valorSeleccionado == "cienciaFiccion") {
        endpoint = '/discover/movie?&with_genres=878&';
        titulo.innerHTML = `<h1>Ciencia-ficción</h1>`
    }
    else if (valorSeleccionado == "comedia") {
        endpoint = '/discover/movie?&with_genres=35&';
        titulo.innerHTML = `<h1>Comedia</h1>`
    }
    else if (valorSeleccionado == "crimen") {
        endpoint = '/discover/movie?&with_genres=80&';
        titulo.innerHTML = `<h1>Crimen</h1>`
    }
    else if (valorSeleccionado == "documental") {
        endpoint = '/discover/movie?&with_genres=99&';
        titulo.innerHTML = `<h1>Documental</h1>`
    }
    else if (valorSeleccionado == "drama") {
        endpoint = '/discover/movie?&with_genres=18&';
        titulo.innerHTML = `<h1>Drama</h1>`
    }
    else if (valorSeleccionado == "familiar") {
        endpoint = '/discover/movie?&with_genres=10751&';
        titulo.innerHTML = `<h1>Familiar</h1>`
    }
    else if (valorSeleccionado == "fantasia") {
        endpoint = '/discover/movie?&with_genres=14&';
        titulo.innerHTML = `<h1>Fantasía</h1>`
    }
    else if (valorSeleccionado == "guerra") {
        endpoint = '/discover/movie?&with_genres=10752&';
        titulo.innerHTML = `<h1>Guerra</h1>`
    }
    else if (valorSeleccionado == "historia") {
        endpoint = '/discover/movie?&with_genres=36&';
        titulo.innerHTML = `<h1>Historia</h1>`
    }
    else if (valorSeleccionado == "horror") {
        endpoint = '/discover/movie?&with_genres=27&';
        titulo.innerHTML = `<h1>Horror</h1>` 
    }
    else if (valorSeleccionado == "musical") {
        endpoint = '/discover/movie?&with_genres=10402&';
        titulo.innerHTML = `<h1>Musical</h1>`
    }
    else if (valorSeleccionado == "misterio") {
        endpoint = '/discover/movie?&with_genres=9648&';
        titulo.innerHTML = `<h1>Misterio</h1>`
    }
    else if (valorSeleccionado == "romance") {
        endpoint = '/discover/movie?&with_genres=10749&';
        titulo.innerHTML = `<h1>Romance</h1>`
    }
    else if (valorSeleccionado == "serieTV") {
        endpoint = '/discover/movie?&with_genres=10770&';
        titulo.innerHTML = `<h1>Series de TV</h1>`
    }
    else if (valorSeleccionado == "thriller") {
        endpoint = '/discover/movie?&with_genres=53&';
        titulo.innerHTML = `<h1>Thriller</h1>`;
    }
    else if (valorSeleccionado == "western") {
        endpoint = '/discover/movie?&with_genres=37&';
        titulo.innerHTML = `<h1>Western</h1>`;
    }


    // Realizar la solicitud a la API con fetch de forma síncrona
    fetch(`${BASE_URL}${endpoint}api_key=${API_KEY}&page=${pagActual}`)
        .then(response => response.json())
        .then(data => {
            const peliculas = data.results || [];
            const divMayor = document.getElementById('peliculas');
            divMayor.innerHTML = '';
            let i = 0; // Contador para crear los id de las peliculas
            peliculas.forEach(pelicula => {
                i++;
                const nombre = pelicula.title;
                const descripcion = pelicula.overview;
                const valoracion = pelicula.vote_average;
                const fecha = pelicula.release_date;               
                if (pelicula.poster_path && pelicula.overview) { // Si existe la foto y descripción
                    let contenedor = document.createElement('div');
                    contenedor.classList.add('peli');
                    divMayor.appendChild(contenedor);
                    const foto = pelicula.poster_path;
                    let texto = document.createElement('p');
                    texto.classList.add('texto-oculto');
                    texto.textContent = `${nombre}`;
                    texto.addEventListener('click', abrirVentana);
                    contenedor.appendChild(texto); // Agregar el nombre al contenedor
                    let nuevaImagen = document.createElement('img'); // Crear un nuevo elemento de imagen
                    nuevaImagen.src = BASE_IMG + foto; // Establecer el atributo src con la ruta de la foto completa
                    nuevaImagen.classList.add('imagenPeli');
                    let nombreSinEspacios = `${nombre.replace(/\s/g, "")}${i}`;
                    nuevaImagen.id = `imagenPeli${nombreSinEspacios}`;
                    nuevaImagen.alt = `${nombre}`
                    contenedor.appendChild(nuevaImagen); // Agregar la nueva imagen al contenedor

                    /* VENTANA EMERGENTE */
                    ventanaEmergente = document.createElement('div');
                    ventanaEmergente.classList.add('overlay');
                    ventanaEmergente.id = `overlay${nombreSinEspacios}`
                    contenedor.appendChild(ventanaEmergente);

                    popUp = document.createElement('div');
                    popUp.classList.add('popup');
                    popUp.innerHTML = `<h2>${nombre}</h2>
                                        (${fecha})<br><br>
                                        ${descripcion}<br><br>
                                        Valoración: ${valoracion.toFixed(2)}/10`;
                    ventanaEmergente.appendChild(popUp);

                    botonCerrar = document.createElement('span');
                    botonCerrar.classList.add('botonCerrar');
                    botonCerrar.addEventListener('click', cerrarVentana);
                    popUp.appendChild(botonCerrar);
                    let icono = document.createElement('i');
                    icono.classList.add('fa-solid', 'fa-circle-xmark', 'fa-xl');
                    botonCerrar.appendChild(icono);

                    // Función para abrir la ventana emergente
                    function abrirVentana() {
                        // Deshabilitar clic en la imagen actual
                        document.getElementById(`imagenPeli${nombreSinEspacios}`).removeEventListener("click", abrirVentana);
                        document.getElementById(`overlay${nombreSinEspacios}`).style.display = "flex";
                        document.body.style.overflow = "hidden"; // Deshabilita el scroll al abrir la ventana emergente  
                        const navElement = document.querySelector('nav');
                        navElement.style.zIndex = '0';
    
                    }   

                    // Función para cerrar la ventana emergente
                    function cerrarVentana() {
                        // Habilitar clic en la imagen actual después de cerrar la ventana
                        document.getElementById(`imagenPeli${nombreSinEspacios}`).addEventListener("click", abrirVentana);
                        document.getElementById(`overlay${nombreSinEspacios}`).style.display = "none";
                        document.body.style.overflow = "auto"; // Restaura el scroll al cerrar la ventana emergente
                        const navElement = document.querySelector('nav');
                        navElement.style.zIndex = '15';
                    }

                    // Asociar la función abrirVentana al clic de la imagen
                    document.getElementById(`imagenPeli${nombreSinEspacios}`).addEventListener("click", abrirVentana);
                } // Fin del if
                console.log(nombre);
            });
        })
        .catch(error => {
            console.error(`Error al hacer la solicitud a la API: ${error.message}`);
        });
}
// ----------------------------------------------------------------------------------------------------------------------------------------

// Función para cambiar a la página anterior
function paginaAnt() {
    if (pagActual > 1) {
        pagActual--;
        actualizarPagina();
    }
}
// ----------------------------------------------------------------------------------------------------------------------------------------

// Función para cambiar a la página siguiente
function paginaSig() {
    pagActual++;
    actualizarPagina();
}
// ----------------------------------------------------------------------------------------------------------------------------------------

// Función para actualizar la página actual y cargar las películas correspondientes
function actualizarPagina() {
    const elementoPagActual = document.getElementById('pagActual');
    elementoPagActual.textContent = pagActual;

    obtenerNombresPeliculas(valorSeleccionado, pagActual);
}
// ----------------------------------------------------------------------------------------------------------------------------------------

// Inicializar la página al cargar
actualizarPagina();
// ----------------------------------------------------------------------------------------------------------------------------------------

// Función para guardar el valor del input para que aparezca en la página de peliculas.html
function guardarValor(event) {
    event.preventDefault();
    let valor = document.getElementById('inputBuscar').value;
    localStorage.setItem('miInputValor', valor);
    window.location.href = 'peliculas.html';
}