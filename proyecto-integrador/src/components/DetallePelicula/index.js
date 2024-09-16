import React, { Component } from "react";

class DetallePelicula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: null,
      esFavorito: false,
    };
  }

  componentDidMount() {
    // Obtener el ID de la película desde los parámetros de la URL
    const { id } = this.props.match.params;
    const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1';

    // Llamada a la API para obtener detalles de la película
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=es-ES`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pelicula: data,
        });
      })
      .catch((error) => console.log(error));

    // Revisar si la película ya está en favoritos
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let arrayParseado = JSON.parse(storage);
      let estaMild = arrayParseado.includes(id); // Usar el ID de la película
      if (estaMild) {
        this.setState({
          esFavorito: true,
        });
      }
    }
  }

  agregarAStorage(id) {
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let storageParseado = JSON.parse(storage);
      storageParseado.push(id);
      let storageStringificado = JSON.stringify(storageParseado);
      localStorage.setItem('categoriaFavs', storageStringificado);
    } else {
      let arrayFavs = [id];
      let favsStringificado = JSON.stringify(arrayFavs);
      localStorage.setItem('categoriaFavs', favsStringificado);
    }
    this.setState({
      esFavorito: true,
    });
  }

  cambiarEsFavorito() {
    const { id } = this.props.match.params;
    if (this.state.esFavorito) {
      // Quitar de favoritos
      let storage = localStorage.getItem('categoriaFavs');
      let storageParseado = JSON.parse(storage);
      let nuevoArray = storageParseado.filter((favId) => favId !== id);
      localStorage.setItem('categoriaFavs', JSON.stringify(nuevoArray));
      this.setState({
        esFavorito: false,
      });
    } else {
      // Agregar a favoritos
      this.agregarAStorage(id);
    }
  }

  render() {
    const { pelicula, esFavorito } = this.state;

    if (!pelicula) {
      return <p>Cargando...</p>;
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
        <button onClick={() => this.cambiarEsFavorito()}>
          {esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      </section>
    );
  }
}

export default DetallePelicula;
