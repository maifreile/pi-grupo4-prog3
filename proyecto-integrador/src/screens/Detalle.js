import React, { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

class DetallePelicula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: null,  // Inicializamos el estado de la película como null
      esFavorito: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; // Obtenemos el ID desde los parámetros de la URL

    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let arrayParseado = JSON.parse(storage); // Convertimos el string en un array
      let estaEnArray = arrayParseado.includes(id); // Verificamos si el ID está en el array
      if (estaEnArray) {
        this.setState({
          esFavorito: true,
        });
      }
    }

    const apikey = '72c246bb35885b3ab17e1a50707d1bf1'; 
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pelicula: data,
        });
      })
      .catch((error) => console.log(error));
  }

  agregarAStorage(id) {
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let storageParseado = JSON.parse(storage); // Convertimos el string a array
      if (!storageParseado.includes(id)) {
        storageParseado.push(id); // Agregamos el ID si no está en el array
        localStorage.setItem('categoriaFavs', JSON.stringify(storageParseado)); // Convertimos de nuevo a string
      }
    } else {
      let arrayFavs = [id]; // Creamos un nuevo array con el ID
      localStorage.setItem('categoriaFavs', JSON.stringify(arrayFavs)); // Lo guardamos como string
    }
    this.setState({
      esFavorito: true,
    });
  }

  eliminarDeStorage(id) {
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let storageParseado = JSON.parse(storage); // Convertimos el string a array
      let nuevoArray = storageParseado.filter(favId => favId !== id); // Eliminamos la película
      localStorage.setItem('categoriaFavs', JSON.stringify(nuevoArray)); // Actualizamos el localStorage
    }
    this.setState({
      esFavorito: false,
    });
  }

  render() {
    const { pelicula, esFavorito } = this.state;
    const { id } = this.props.match.params; // Obtenemos el ID desde los parámetros de la URL

    if (!pelicula) {
      return <p>Cargando...</p>; // Mostramos un mensaje de carga mientras se obtienen los datos
    }

    return (
      <section>
        <h1>{pelicula.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
        />
        <p>Calificación: {pelicula.vote_average}</p>
        <p>Fecha de estreno: {pelicula.release_date}</p>
        <p>Duración: {pelicula.runtime} minutos</p>
        <p>Sinopsis: {pelicula.overview}</p>
        <p>Género: {pelicula.genres.map((genre) => genre.name).join(', ')}</p>

        {/* Botón que cambia entre agregar a favoritos y sacar de favoritos */}
        {
          esFavorito ? (
            <button onClick={() => this.eliminarDeStorage(id)}>
              Sacar de favoritos
            </button>
          ) : (
            <button onClick={() => this.agregarAStorage(id)}>
              Agregar a favoritos
            </button>
          )
        }
      </section>
    );
  }
}

export default DetallePelicula;
