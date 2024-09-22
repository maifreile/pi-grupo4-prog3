import React, {Component} from "react";
import PeliculaPopular from "../PeliculaPopular";
import Filtro from "../Filtro";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css'
const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1'

class TodasPopulares extends Component {
    constructor(props) {
        super(props)
        this.state= {
            peliculas: [],
            peliculasFiltradas: [],
            cargando: true,
            peliculasVisibles:10
        }
        console.log('Soy el constructor');
        
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`)
        
        .then((resp) => resp.json())

        .then((data) => {
            setTimeout(() => {
                this.setState({
                    peliculas: data.results,
                    peliculasFiltradas: data.results, 
                    cargando: false
                })   
            }, 2000); 
        })

        .catch ((error)=> {
            console.log(error);
            this.setState({
                cargando: false,
            });
        })
        
    }

    componentDidUpdate(){
        console.log('soy el didUpdate');
        
    }

    componentWillUnmount(){
        console.log('soy el willUnmount');
        
    }

    cambiarCargarMas = () => {
        this.setState((prevState) => ({
            peliculasVisibles: prevState.peliculasVisibles + 5
        }));
    };

    filtrarPeliculas = (peli) => {
        const pelisFiltradas = this.state.peliculas.filter((elm) =>
          elm.title.toLowerCase().includes(peli.toLowerCase())
        );
        this.setState({
          peliculasFiltradas: pelisFiltradas, // Actualizas el estado de películas filtradas
        });
      };

      render() {
        return (
          <div className="cardContainer">
            <Filtro filtrarPeliculas={(peli) => this.filtrarPeliculas(peli)} />
            {this.state.cargando ? (
              <div>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <h1 className="cargando">Cargando...</h1>
              </div>
            ) : this.state.peliculasFiltradas.length > 0 ? (
              <div className="cardContainer">
                {this.state.peliculasFiltradas
                  .slice(0, this.state.peliculasVisibles)
                  .map((elm) => (
                    <PeliculaPopular data={elm} />
                  ))}
                {this.state.peliculasVisibles < this.state.peliculasFiltradas.length && (
                  <button onClick={this.cambiarCargarMas}>Cargar más</button>
                )}
              </div>
            ) : (
              <h1>No se encontraron películas</h1>
            )}
          </div>
        );
      }
}

export default TodasPopulares