import React, { Component } from "react";
import { Link } from 'react-router-dom';

const apiKey = '72c246bb35885b3ab17e1a50707d1bf1';

class PeliculasFavoritas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [], // va a tener las peliculas favoritas 
      textoDescripcion: "Ver descripción",
      textoDetalle: "Detalle",
    };
  }

  componentDidMount() {
    let storage = localStorage.getItem('categoriaFavs'); // Obtiene las IDs de las películas en favoritos
    
    if (storage !== null) {
      let favoritos = JSON.parse(storage); // Convierte a array

      // Verifica que el array de favoritos no esté vacío
      if (favoritos.length > 0) {
        // Crea un array de Promesas con las llamadas a fetch
        const promises = favoritos.map(id => 
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(resp => resp.json())
            .catch(error => console.log(error))
        );

        // Usa Promise.all para esperar a que todas las promesas se resuelvan
        Promise.all(promises)
          .then(resultados => {
            // Filtra los resultados para asegurarte de que las películas tengan datos válidos
            const peliculasValidas = resultados.filter(data => data && data.id);

            // Actualiza el estado con las películas válidas
            this.setState({
              peliculas: peliculasValidas
            });
          })
          .catch(error => console.log(error));
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
  // Elimina la película de favoritos
  sacarDeFavoritos = (id) => {
    let favoritos = JSON.parse(localStorage.getItem('categoriaFavs'));

    // Elimina la película por su ID
    let nuevosFavoritos = favoritos.filter(favId => favId !== id);

    // Actualiza localStorage con la nueva lista
    localStorage.setItem('categoriaFavs', JSON.stringify(nuevosFavoritos));

    // Actualiza el estado para reflejar los cambios en la interfaz
    this.setState({
      peliculas: this.state.peliculas.filter(pelicula => pelicula.id !== id),
    });
  }

  render() {
    const { peliculas, textoDescripcion } = this.state;
    
    return (
      <section className="contenedor" >
        <h1>Películas Favoritas</h1>
       
        {peliculas.length === 0 ? (
          <p>No hay películas favoritas.</p>
        ) : (
          <div className="cardContainer">
            {peliculas.map(pelicula => (
              <div className="pelicula-card" key={pelicula.id}>
                <h2>{pelicula.title}</h2>
                <Link to={`/detalle/${pelicula.id}`}>
                  <img
                    className="imagen-pelicula"
                    src={`https://image.tmdb.org/t/p/w342/${pelicula.poster_path}`}
                    alt={pelicula.title}
                  />
                </Link>
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
            ))}
          </div>
        )}
       
      </section>
    );
  }
}
export default PeliculasFavoritas;
