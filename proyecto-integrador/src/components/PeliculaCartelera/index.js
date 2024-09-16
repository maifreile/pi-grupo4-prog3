import React, {Component} from "react";
import PeliculasCartelera from "../PeliculasCartelera";

class PeliculaCartelera extends Component {
    constructor(props){
        super(props) 
        this.state = {
            verDescripcion: false,
            esFavorito: false,
            textoDescripcion:'Ver descripción',
            textoDetalle: 'Ir a detalle',
            PeliculasEnCartelera: []
        }
    }

        componentDidMount(){
            
        }
    
        componentDidUpdate(){
            console.log('soy el didUpdate');
        }
    
        componentWillUnmount(){
            console.log('soy el willUnmount');
        }
    

        cambiarverDescripcion(){
            this.setState({
                verDescripcion: !this.state.verDescripcion,
                textoDescripcion: this.state.verDescripcion ? 'Ver descripción' : 'Cerrar descripción'
            })
        }

        cambiarEsFavorito(){
            this.setState({
                esFavorito: !this.state.esFavorito,

            })
            if (this.state.esFavorito) {
                console.log(`Se agregó ${PeliculasCartelera.title} a favoritos`);
                
            } else {
                console.log(`Se quitó ${PeliculasCartelera.title} de favoritos`);
            }
        }

        

render() {
    console.log('props', this.props)
    return(
    
    <div className='pelicula-card'>

        <img src={`https://image.tmdb.org/t/p/w500${this.props.data.poster_path}`} alt="" /> 
        <h2>{this.props.data.title} </h2>
      
         {
            this.state.verDescripcion 
            ?
            <p >{this.props.data.overview}</p>
            :
            null
        }

       <div className="botones">
       <button className='more' onClick={()=> this.cambiarverDescripcion()}>
            {this.state.textoDescripcion}</button>
        
        <button className='detail' onClick={() => this.irADetalle()}> 
            {this.state.textoDetalle}</button>
        
        <i className={this.state.esFavorito ? "fas fa-heart" : "far fa-heart"} onClick={() => this.cambiarEsFavorito(PeliculaCartelera)} />
       </div>

    </div>


    )
}

}

export default PeliculaCartelera