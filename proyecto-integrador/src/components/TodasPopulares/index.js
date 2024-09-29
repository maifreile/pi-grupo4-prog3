import React, { Component } from "react";
import Pelicula from "../Pelicula";
import Filtro from "../Filtro";
import './styles.css'

const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1'

class TodasPopulares extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peliculas: [],
      peliculasFiltradas: [],
      cargando: true,
      paginaACargar: 2 
    }
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`)
      .then((resp) => resp.json())
      .then((data) => {
        setTimeout(() => {
          this.setState({
            peliculas: data.results,
            peliculasFiltradas: data.results,
            cargando: false 
          })
        }, 500); 
      })
      .catch((error) => {
        console.log(error);
        this.setState({ cargando: false });
      });
  }

  cambiarCargarMas = () => {
    this.setState({ cargando: true });

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&page=${this.state.paginaACargar}`)
      .then(resp => resp.json())
      .then((data) => {
        setTimeout(() => {
          this.setState((prevState) => ({
            peliculas: prevState.peliculas.concat(data.results), // Concatena las nuevas películas
            peliculasFiltradas: prevState.peliculas.concat(data.results), // Actualiza también las filtradas
            paginaACargar: prevState.paginaACargar + 1, // Incrementa la página para la siguiente carga
            cargando: false // termina el estado de carga
          }));
        }, 500); // medio segundo
      })
      .catch(err => {
        console.log(err);
        this.setState({ cargando: false }); 
      });
  };

  filtrarPeliculas = (peli) => {
    const pelisFiltradas = this.state.peliculas.filter((elm) =>
      elm.title.toLowerCase().includes(peli.toLowerCase())
    );
    this.setState({ peliculasFiltradas: pelisFiltradas });
  };

  render() {
    return (
      <div className="cardContainer">
        <div className="todas">
          <h1 className="tituloTodas">Películas populares</h1>
          <Filtro filtrarPeliculas={(peli) => this.filtrarPeliculas(peli)} />
        </div>
        
        {this.state.cargando 
          ? (
            <div className="conteiner-cargando">
              <h1 className="cargando">Cargando...</h1>
            </div>
          ) : this.state.peliculasFiltradas.length > 0 
          ? (
            <div className="cardContainer">
              {this.state.peliculasFiltradas.map((elm) => (
                <Pelicula data={elm} key={elm.id} />
              ))}
              <button className="cargarMas" onClick={this.cambiarCargarMas}>Cargar más</button>
            </div>
          ) : (
            <div className="noResults">
              <h1 className="noFav">No hay resultados para tu búsqueda</h1>
            </div>
          )}
      </div>
    );
  }
}

export default TodasPopulares;
