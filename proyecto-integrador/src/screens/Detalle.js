import React, { Component } from "react";

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esFavorito: false,
      pelicula: "", 
      cargando: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const apikey = '72c246bb35885b3ab17e1a50707d1bf1';
  
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pelicula: data,
          cargando: false,
        });
      })
      .catch((error) => console.log(error));
  
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let arrayParseado = JSON.parse(storage);
      let estaEnArray = arrayParseado.includes(parseInt(id));  // Convertir id a número
      if (estaEnArray) {
        this.setState({
          esFavorito: true,
        });
      }
    }
  }
  
  agregarAFavoritos(id) {
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let storageParseado = JSON.parse(storage);
      if (!storageParseado.includes(parseInt(id))) {  // Convierte id a número
        storageParseado.push(parseInt(id)); 
        localStorage.setItem('categoriaFavs', JSON.stringify(storageParseado));
      }
    } else {
      let arrayFavs = [parseInt(id)];  //  el id sea un número
      localStorage.setItem('categoriaFavs', JSON.stringify(arrayFavs));
    }
    this.setState({
      esFavorito: true,
    });
  }
  
  eliminarDeFavoritos(id) {
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let storageParseado = JSON.parse(storage);
      let nuevoArray = storageParseado.filter(favId => favId !== parseInt(id));  // Convierte id a número
      localStorage.setItem('categoriaFavs', JSON.stringify(nuevoArray));
    }
    this.setState({
      esFavorito: false,
    });
  }

  render() {
    const { pelicula, esFavorito, cargando } = this.state;
    const { id } = this.props.match.params;
    console.log(pelicula, esFavorito)

    return (
      cargando ? (
        <div className="conteiner-cargando">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <h1 className="cargando">Cargando...</h1>
        </div>
      ) : !pelicula ? (
        <h1>No se encontraron detalles de la película</h1>
      ) : (
        <div className="pelicula-card-det">
          <h1 className="tituloDetalle">{pelicula.title}</h1>
          <img className="imgDet"
            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
            alt=" "
          />
          <p className="rating">Calificación: {pelicula.vote_average}</p>
          <p className="release">Fecha de estreno: {pelicula.release_date}</p>
          <p className="duration">Duración: {pelicula.runtime} minutos</p>
          <p className="overview">Sinopsis: {pelicula.overview}</p>
          <p className="genre">Géneros: {pelicula.genres.map((genre) => genre.name).join(', ')}</p>

          <i
            className={esFavorito ? "fas fa-heart" : "far fa-heart"}
            onClick={() => esFavorito ? this.eliminarDeFavoritos(id) : this.agregarAFavoritos(id)}
          />
        </div>
      )
    );
  }
}

export default Detalle;
