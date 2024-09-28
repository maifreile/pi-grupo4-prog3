import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Pelicula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false,
      esFavorito: false,
      textoDescripcion: "Ver descripción",
      textoDetalle: "Detalle",
    }
  }

  componentDidMount() {
    // Verificamos si esta película ya está en favoritos cuando el componente carga

    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let arrayParseado = JSON.parse(storage);
      let estaEnArray = arrayParseado.includes(this.props.data.id);
      if (estaEnArray) {
        this.setState({
          esFavorito: true
        });
      }
    }
  }

  cambiarverDescripcion() {
    this.setState({
      verDescripcion: !this.state.verDescripcion,
      textoDescripcion: this.state.verDescripcion
        ? "Ver descripción"
        : "Cerrar descripción",
    });
  }

  agregarAFavoritos(id) {
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let storageParseado = JSON.parse(storage);
      if (!storageParseado.includes(parseInt(id))) {
        storageParseado.push(parseInt(id));
        localStorage.setItem('categoriaFavs', JSON.stringify(storageParseado));
      }
    } else {
      let arrayFavs = [parseInt(id)];
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
    this.setState({ esFavorito: false });
  }

  render() {
    const { id, title, poster_path, overview } = this.props.data;
    const { verDescripcion, textoDescripcion, textoDetalle } = this.state;

    return (
      <div className="pelicula-card">
        <Link to={`/detalle/${id}`}>
          <img
            className="imagen-pelicula"
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt=""
          />
        </Link>
        <h2>{title}</h2>
        {verDescripcion ? <p>{overview}</p> : null}

        <div className="botones">
          <button className="more" onClick={() => this.cambiarverDescripcion()}>
            {textoDescripcion}
          </button>

          <Link to={`/detalle/${id}`}>
            <button className="detail">{textoDetalle}</button>
          </Link>

          <i
            className={this.state.esFavorito ? "fas fa-heart" : "far fa-heart"}
            onClick={() => this.state.esFavorito ? this.eliminarDeFavoritos(id) : this.agregarAFavoritos(id)}
          />
        </div>
      </div>
    );
  }
}

export default Pelicula;
