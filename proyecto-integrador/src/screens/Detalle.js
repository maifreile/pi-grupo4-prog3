import React, { Component } from "react"; //Con esto nos permite crear componenetes
import '@fortawesome/fontawesome-free/css/all.min.css';

class DetallePelicula extends Component {
  constructor(props) { //En el constructor, el props va a recibir los datos que se pasan
    super(props);
    this.state = {  //Con state, podemos cambiar los datos con el tiempo (Si se apreta el botn de favoritos)
      esFavorito: false, //Al principio la pelicula no est marcada como favorita
    };
  }

  componentDidMount() { //Lo que se ejcuta cuando el componente esta en pantalla
    const { id } = this.props.match.params; // trae el id desde los parámetros de la URL

    let storage = localStorage.getItem('categoriaFavs'); //Busca si la peli esta guardada como favorita en el navegador
    if (storage) {  //Es mas seguro !== null pq puede traer un array vacio
      let arrayParseado = JSON.parse(storage); // Convertimos el string en un array
      let estaEnArray = arrayParseado.includes(id); // Verificamos si el id está en el array
      if (estaEnArray) {
        this.setState({ //Si la peli ya esta fvaorita, actualizamos el etsado para que sea true
          esFavorito: true,
        });
      }
    }

    const apikey = '72c246bb35885b3ab17e1a50707d1bf1'; 
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=es-ES`)
    //Va a buscar info de la pelicula con el id que tenemos
      .then((response) => response.json()) //Convierte en formato JSON
      .then((data) => {
        this.setState({
          pelicula: data, //Guarda los datos 
        });
      })
      .catch((error) => console.log(error)); //por si hay un error
  }

  cambiarEsFavorito() { //Cambia si a peli es favorita o no
    const { esFavorito, pelicula } = this.state; //Si ES favorita y los datos
    let favoritos = JSON.parse(localStorage.getItem("categoriaFavs"));

    favoritos = esFavorito 
      ? favoritos.filter((favId) => favId !== pelicula.id) //Si ya es favorita, la quita de la lista
      : [...favoritos, pelicula.id]; //Si no es favorita, la agrega a la lista
    
    // Guardamos los favoritos actualizados en localStorage
    localStorage.setItem("categoriaFavs", JSON.stringify(favoritos));

    this.setState({ esFavorito: !esFavorito });//Cambia el estado para ver si la peli es favorita o no
  }

  agregarAStorage(id) {
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let storageParseado = JSON.parse(storage); // Convertimos el string a array
      if (!storageParseado.includes(id)) {
        storageParseado.push(id); // Agregamos el ID si no está en el array
        localStorage.setItem('categoriaFavs', JSON.stringify(storageParseado)); // Convertimos de nuevo a string
      }
    } else {
      let arrayFavs = [id]; // Creamos un nuevo array con el ID
      localStorage.setItem('categoriaFavs', JSON.stringify(arrayFavs)); // Lo guardamos como string
    }
    this.setState({
      esFavorito: true,
    });
  }
//Elimino las peliculas de favoritos
  eliminarDeStorage(id) {
    let storage = localStorage.getItem('categoriaFavs');
    if (storage !== null) {
      let storageParseado = JSON.parse(storage); // Convertimos el string a array
      let nuevoArray = storageParseado.filter(favId => favId !== id); // Eliminamos la película
      localStorage.setItem('categoriaFavs', JSON.stringify(nuevoArray)); // Actualizamos el localStorage
    }
    this.setState({
      esFavorito: false,
    });
  }

  render() {
    const { pelicula, esFavorito } = this.state;
    
    if (!pelicula) {
      return <p>Cargando...</p>; // Mostramos un mensaje de carga mientras se obtienen los datos
    }

    return (
      <section>
        <h1>{pelicula.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
        />
        <p>Calificación: {pelicula.vote_average}</p>
        <p>Fecha de estreno: {pelicula.release_date}</p>
        <p>Duración: {pelicula.runtime} minutos</p>
        <p>Sinopsis: {pelicula.overview}</p>
        <p>Género: {pelicula.genres.map((genre) => genre.name).join(', ')}</p>
  {/* Boton para agregar o quitar peliculas */}
        <button onClick={() => this.cambiarEsFavorito()}> 
          {esFavorito ? "Sacar de favoritos" : "Agregar a favoritos"}
        </button>
      </section>
    );
  }
}

export default DetallePelicula;
