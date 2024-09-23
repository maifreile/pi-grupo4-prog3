import React, { Component } from "react";
import PeliculaPopular from '../components/PeliculaCartelera'
const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1'


export default class Resultados extends Component {
    constructor(props) {
        super(props)
        this.state ={
            resultados: [],
            cargando: true 
        } 
    }

    componentDidMount(){
        const loQueBuscaElUsuario = this.props.history.location.state.busqueda
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${loQueBuscaElUsuario}`)
        .then(resp => resp.json())
        .then(data=> {
          setTimeout(() => {
            this.setState({
              resultados:data.results,
              cargando: false
            })
          }, 1200);
        })
          
        .catch((error) => {
          console.log(error);
          this.setState({ cargando: false }); 
        });
    }


    render() {
      return (
        <>
          <h1>Resultados de búsqueda</h1>
          <div className="cardContainer">
            {this.state.cargando ? (
              <div className="conteiner-cargando">
                <i className="fa-solid fa-spinner fa-spin"></i>
                <h1 className="cargando">Cargando...</h1>
              </div>
            ) : this.state.resultados.length > 0 ? (
              this.state.resultados.map((elm) => <PeliculaPopular key={elm.id} data={elm} />)
            ) : (
              <h1>No hay resultados</h1>
            )}
          </div>
        </>
      );
    }
  }