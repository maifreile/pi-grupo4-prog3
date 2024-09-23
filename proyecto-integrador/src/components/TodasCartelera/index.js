import React, { Component } from "react";
import PeliculaCartelera from "../PeliculaCartelera";
import Filtro from "../Filtro";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1';

class TodasCartelera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [], 
      peliculasFiltradas: [], 
      cargando: true,
      paginaACargar: 2
    }
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log('data que recibi:', data);
        
        setTimeout(() => {
          this.setState({
            peliculas: data.results, 
            peliculasFiltradas: data.results, 
            cargando: false,
          });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          cargando: false,
        });
      });
  }

  cambiarCargarMas = () => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&page=${this.state.paginaACargar}`)
    .then(resp => resp.json())
    .then((data) => {
      this.setState((prevState) => ({
        peliculas: prevState.peliculas.concat(data.results), // Concatena las nuevas películas
        peliculasFiltradas: prevState.peliculas.concat(data.results), // Actualiza también las filtradas
        paginaACargar: prevState.paginaACargar + 1 // Incrementa la página para la siguiente carga
      }));
    })
    .catch(err => console.log(err));
    
  };

  filtrarPeliculas = (peli) => {
    const pelisFiltradas = this.state.peliculas.filter((elm) =>
      elm.title.toLowerCase().includes(peli.toLowerCase())
    );
    this.setState({
      peliculasFiltradas: pelisFiltradas, // Actualiza el estado de películas filtradas
    });
  };

  render() {
    return (
      <div className="cardContainer">
        <div className="todas">
        <h1 className="tituloTodas" >Peliculas en cartelera</h1>
        <Filtro filtrarPeliculas={(peli) => this.filtrarPeliculas(peli)} />
        </div>
        {this.state.cargando 
          ? 
          <div>
            <i className="fa-solid fa-spinner fa-spin"></i>
            <h1 className="cargando">Cargando...</h1>
          </div>
          : 
          this.state.peliculasFiltradas.length > 0 
          ? 
          <div className="cardContainer">
            {this.state.peliculasFiltradas.map((elm) => (<PeliculaCartelera data={elm}/>))}
           <button className="cargarMas" onClick={()=>this.cambiarCargarMas()}>Cargar más</button>
          </div>
         : 
          <h1>No se encontraron películas</h1>
        }
      </div>
    );
  }
}

export default TodasCartelera;
