import React, { Component } from "react"; // Con esto nos permite crear componenetes
import '@fortawesome/fontawesome-free/css/all.min.css';

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esFavorito: false,
      pelicula: null,
      cargando: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; // Trae el id desde los parámetros de la URL
    const apikey = '72c246bb35885b3ab17e1a50707d1bf1';
    
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=es-ES`)
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
      let estaEnArray = arrayParseado.includes(id);
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
      if (!storageParseado.includes(id)) {
        storageParseado.push(id);
        localStorage.setItem('categoriaFavs', JSON.stringify(storageParseado));
      }
    } else {
      let arrayFavs = [id];
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
      let nuevoArray = storageParseado.filter(favId => favId !== id);
      localStorage.setItem('categoriaFavs', JSON.stringify(nuevoArray));
    }
    this.setState({
      esFavorito: false,
    });
  }

  render() {
    const { pelicula, esFavorito, cargando } = this.state;
    const { id } = this.props.match.params; // Extraer el ID aquí

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
            alt={pelicula.title}
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
