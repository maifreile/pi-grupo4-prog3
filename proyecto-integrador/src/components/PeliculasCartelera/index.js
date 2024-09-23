import React, {Component} from "react";
import Pelicula from '../Pelicula';
import './styles.css'
const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1'

class PeliculasCartelera extends Component {
    constructor(props) {
        super(props)
        this.state= {
            peliculasEnCartelera: [],
            cargando: true
        }    
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}`)
    
        .then((resp) => resp.json())

        .then((data) => {

            setTimeout(()=> this.setState({
                peliculasEnCartelera: data.results,
                cargando: false,
              })  , 1000)
        })

        .catch ((error)=> {
            console.log(error);
            this.setState({
                cargando: false,
            });
        })
        
    }

    render(){
    
        return(
       
            <div className='cardContainer'>
                {this.state.cargando ? (
                    <div className="conteiner-cargando">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <h1 className="cargando">Cargando...</h1>
                    </div>
                ) : (
                   this.state.peliculasEnCartelera.length > 0
                    ?
                    this.state.peliculasEnCartelera.slice(0,5).map((elm)=> <Pelicula data={elm}/>)
                    :
                    <h1>Cargando...</h1>
                )}
            </div>
    
        )
    }
}

export default PeliculasCartelera