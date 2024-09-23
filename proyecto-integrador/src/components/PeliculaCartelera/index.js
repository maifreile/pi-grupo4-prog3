import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 

class PeliculaCartelera extends Component {
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
    const favoritos = JSON.parse(localStorage.getItem("categoriaFavs")) || [];
    const esFavorito = favoritos.includes(this.props.data.id);
    this.setState({ esFavorito });
  }

  cambiarverDescripcion() {
    this.setState({
      verDescripcion: !this.state.verDescripcion,
      textoDescripcion: this.state.verDescripcion
        ? "Ver descripción"
        : "Cerrar descripción",
    });
  }

  cambiarEsFavorito() {
    const { esFavorito } = this.state;
    let favoritos = JSON.parse(localStorage.getItem("categoriaFavs")) || [];

    favoritos = esFavorito 
    ? favoritos.filter((id) => id !== this.props.data.id)
    : [...favoritos, this.props.data.id];
    
    // Guardamos los favoritos actualizados en localStorage
    localStorage.setItem("categoriaFavs", JSON.stringify(favoritos));

   
    this.setState({ esFavorito: !esFavorito });
  }

  irADetalle() {
    this.props.history.push(`/detalle/${this.props.data.id}`);
  }

  render() {
    const { esFavorito, verDescripcion, textoDescripcion, textoDetalle } = this.state;
    const { data } = this.props;

    return (
      <div className="pelicula-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
        />
        <h2>{data.title}</h2>

        {verDescripcion ? <p>{data.overview}</p> : null}

        <div className="botones">
          <button className="more" onClick={() => this.cambiarverDescripcion()}>
            {textoDescripcion}
          </button>

          <button className="detail" onClick={() => this.irADetalle()}>
            {textoDetalle}
          </button>

          <i
            className={esFavorito ? "fas fa-heart" : "far fa-heart"}
            onClick={() => this.cambiarEsFavorito()}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(PeliculaCartelera);