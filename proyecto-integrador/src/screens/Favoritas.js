import React, { Component } from "react";
//Importamos las peliculas

//Ponemos la API
const apiKey = '72c246bb35885b3ab17e1a50707d1bf1';

//Pongo estado para Almacenar datos que puedan cambiar (como la lista de películas).
//Actualizar automáticamente la interfaz cuando esos datos cambien.
class PeliculasFavoritas extends Component {
  constructor(props) {
    super(props); //Para pasar a la clase padre (Component) todos los datos 
    //Se accede a los datos con this.props
    this.state = {
      peliculas: [], //Contiene los datos
    };
  }
  sacarDeFavoritos = (id) => {
    // Obtener el array de favoritos desde el localStorage
    let favoritos = JSON.parse(localStorage.getItem('categoriaFavs'));
    
    // Eliminar la película de favoritos filtrando el id
    let nuevosFavoritos = favoritos.filter(favId => favId !== id);

    // Actualizar el localStorage con el nuevo array
    localStorage.setItem('categoriaFavs', JSON.stringify(nuevosFavoritos));

    // Actualizar el estado quitando la película de la lista
    this.setState({
      peliculas: this.state.peliculas.filter(pelicula => pelicula.id !== id),
    });
  }
  componentDidMount() {
    let storage = localStorage.getItem('categoriaFavs');//LocalStorage permite almacenar datos del usuario en el navegador aunque este cargue la pantalla
    console.log ("Data:", storage) //Para ver que nos trae storage
    
    if (storage !== null) {
      let favoritos = JSON.parse(storage); // Convertimos el string a array
      favoritos.map(id => //Recorre cada elemento del array favoritos (que ahora contiene IDs de películas favoritas)
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`)
                .then((resp) => resp.json()) //Transforma lo de fetch en un objeto 
                .then((data) => {
                    console.log("data:", data)
                    this.setState({
                        peliculas: this.state.peliculas.concat(data),//Me trae el array vacio de peliculas y le agrega la data de cada pelicula
                    });
                    
                })
                .catch((e) => console.log(e)))
    }
  }

  render() {
    const { peliculas } = this.state;

    if (peliculas.length === 0) {
      return <p>No hay películas favoritas.</p>;
    }

    return (
      <section>
        <h1>Películas Favoritas</h1>
        <ul>
          {peliculas.map(pelicula => (  //map es un metodo que itera sobre el array e imprime el contenido
            <li key={pelicula.id}>
              <h2>{pelicula.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title}
              />
              <p>Calificación: {pelicula.vote_average}</p>
              <p>Fecha de estreno: {pelicula.release_date}</p>
              <p>Duración: {pelicula.runtime} minutos</p>
              <p>Sinopsis: {pelicula.overview}</p>
              <button onClick={() => this.sacarDeFavoritos(pelicula.id)}>
                Sacar de favoritos
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default PeliculasFavoritas;
