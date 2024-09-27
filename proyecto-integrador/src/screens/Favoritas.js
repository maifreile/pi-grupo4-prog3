import React, { Component } from "react";
import { Link } from 'react-router-dom';

const apiKey = '72c246bb35885b3ab17e1a50707d1bf1';

class PeliculasFavoritas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      verDescripcion: false,
      textoDescripcion: "Ver descripción",
    };
  }

  componentDidMount() {
    let storage = localStorage.getItem('categoriaFavs');

    if (storage !== null) {
      let favoritos = JSON.parse(storage);
      
      if (favoritos.length > 0) {
        const promises = favoritos.map(id => 
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(resp => resp.json())
            .catch(error => console.log(error))
        );

        Promise.all(promises)
          .then(resultados => {
            const peliculasValidas = resultados.filter(data => data && data.id);
            this.setState({
              peliculas: peliculasValidas
            });
          })
          .catch(error => console.log(error));
      }
    }
  }

  cambiarverDescripcion() {
    this.setState(prevState => ({
      verDescripcion: !prevState.verDescripcion,
      textoDescripcion: prevState.verDescripcion ? "Ver descripción" : "Cerrar descripción",
    }));
  }

  sacarDeFavoritos = (id) => {
    let favoritos = JSON.parse(localStorage.getItem('categoriaFavs'));
    let nuevosFavoritos = favoritos.filter(favId => favId !== id);
    localStorage.setItem('categoriaFavs', JSON.stringify(nuevosFavoritos));
    this.setState({
      peliculas: this.state.peliculas.filter(pelicula => pelicula.id !== id),
    });
  }

  render() {
    const { peliculas, verDescripcion, textoDescripcion } = this.state;

    return (
      <section className="contenedor">
        <h1>Películas Favoritas</h1>
        {peliculas.length === 0 ? (
          <p>No hay películas favoritas.</p>
        ) : (
          <div className="cardContainer">
            {peliculas.map(pelicula => (
              <div className="pelicula-card" key={pelicula.id}>
                <Link to={`/detalle/${pelicula.id}`}>
                  <img
                    className="imagen-pelicula"
                    src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`}
                    alt={pelicula.title}
                  />
                </Link>
                <h2>{pelicula.title}</h2>
                
                <div className="botones-favoritos">
                  {verDescripcion && <p>{pelicula.overview}</p>}
                  <div className="botones">
                    <button className="more" onClick={() => this.cambiarverDescripcion()}>
                      {textoDescripcion}
                    </button>

                    <Link to={`/detalle/${pelicula.id}`}>
                      <button className="detail">Ver Detalle</button>
                    </Link>

                    <button className="more" onClick={() => this.sacarDeFavoritos(pelicula.id)}>
                      Sacar de favoritos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default PeliculasFavoritas;
