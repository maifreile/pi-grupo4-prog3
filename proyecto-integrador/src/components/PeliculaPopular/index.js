import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // Asegúrate de importar withRouter

class PeliculaPopular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false,
      esFavorito: false,
      textoDescripcion: "Ver descripción",
      textoDetalle: "Ir a detalle",
    };
  }

  componentDidMount() {
    // Verificamos si esta película ya está en favoritos cuando el componente carga
    const favoritos = JSON.parse(localStorage.getItem("categoriaFavs")) || [];
    const esFavorito = favoritos.includes(this.props.data.id);
    this.setState({ esFavorito });
  }

  componentDidUpdate() {
    console.log("soy el didUpdate");
  }

  componentWillUnmount() {
    console.log("soy el willUnmount");
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

    if (esFavorito) {
      // Si ya es favorito, lo quitamos de la lista
      favoritos = favoritos.filter((id) => id !== this.props.data.id);
      console.log(`Se quitó ${this.props.data.title} de favoritos`);
    } else {
      // Si no es favorito, lo agregamos
      favoritos.push(this.props.data.id);
      console.log(`Se agregó ${this.props.data.title} a favoritos`);
    }

    // Guardamos los favoritos actualizados en localStorage
    localStorage.setItem("categoriaFavs", JSON.stringify(favoritos));

    // Actualizamos el estado
    this.setState({ esFavorito: !esFavorito });
  }

  irADetalle() {
    this.props.history.push(`/detalle/${this.props.data.id}`); // Asegúrate de usar el ID correcto
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

export default withRouter(PeliculaPopular);
