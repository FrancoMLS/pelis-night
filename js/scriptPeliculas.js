const API_KEY = 'e04b8f3802fae2ce1d6e57c3b5ffa2e3';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMG = 'https://image.tmdb.org/t/p/w200/';

pagActual = 1;

function obtenerValor(pagActual) {
    var valor = localStorage.getItem('miInputValor');
    document.getElementById('pagActual').textContent = `${pagActual}`;
    document.getElementById('pagActual2').textContent = `${pagActual}`;
    let resultadoPelicula = document.getElementById('resultadosPeliculas');
    resultadoPelicula.innerHTML = `'${valor}'`

    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${valor}&page=${pagActual}`)
        .then(response => response.json())
        .then(data => {
            const peliculas = data.results || [];
            const divMayor = document.getElementById('peliculas');
            divMayor.innerHTML = '';
            let i = 0; // Contador para crear los id de las películas
            let cantidadResultadoPelicula = document.getElementById('cantidadResultadosPeliculas'); // Sirve para calcular la cantidad de páginas totales para la función paginaSig()
            cantidadResultadoPelicula.textContent = `${data.total_results}`
            peliculas.forEach(pelicula => {
                const nombre = pelicula.title;
                const descripcion = pelicula.overview;
                const valoracion = pelicula.vote_average;
                const fecha = pelicula.release_date;
                i++;
                if (pelicula.poster_path && pelicula.overview) {
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
                        document.querySelector('.peliculashtml').classList.add('overlay-abierto');
                    }

                    // Función para cerrar la ventana emergente
                    function cerrarVentana() {
                        // Habilitar clic en la imagen actual después de cerrar la ventana
                        document.getElementById(`imagenPeli${nombreSinEspacios}`).addEventListener("click", abrirVentana);
                        document.getElementById(`overlay${nombreSinEspacios}`).style.display = "none";
                        document.body.style.overflow = "auto"; // Restaura el scroll al cerrar la ventana emergente
                        document.querySelector('.peliculashtml').classList.remove('overlay-abierto');
                    }

                    // Asociar la función abrirVentana al clic de la imagen
                    document.getElementById(`imagenPeli${nombreSinEspacios}`).addEventListener("click", abrirVentana);
                }
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
    // Verificar si estás en la última página
    const totalResults = parseInt(document.getElementById('cantidadResultadosPeliculas').innerText, 10);
    const resultsPerPage = 20; // Ajusta esto según la cantidad de resultados por página
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    if (pagActual < totalPages) {
        pagActual++;
        actualizarPagina();
    }
}
// ----------------------------------------------------------------------------------------------------------------------------------------

// Función para actualizar la página actual y cargar las películas correspondientes
function actualizarPagina() {
    const elementoPagActual = document.getElementById('pagActual');
    elementoPagActual.textContent = pagActual;

    obtenerValor(pagActual);
}

// Inicializar la página al cargar
actualizarPagina();