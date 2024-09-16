import React, {Component} from "react";
import PeliculaCartelera from "../PeliculaCartelera";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css'
const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1'

class TodasCartelera extends Component {
    constructor(props) {
        super(props)
        this.state= {
            peliculas: [],
            cargando: true,
            peliculasVisibles: 10
        }
        console.log('Soy el constructor');
        
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}`)
        
        .then((resp) => resp.json())

        .then((data) => {
            setTimeout(() => {
                this.setState({
                    peliculas: data.results,
                    cargando: false,
                    verMas: false
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

    render(){
        return(
            <div className='cardContainer'>
                {this.state.cargando 
                ? 
                    <div>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <h1 className="cargando">Cargando...</h1>
                    </div>
                : 
              this.state.peliculas.length > 0 
                ? 
                   <div className='cardContainer'> 
                    {
                        this.state.peliculas.slice(0, this.state.peliculasVisibles).map((elm)=> <PeliculaCartelera data={elm}/>)
                    }
                    {
                        this.state.peliculasVisibles < 20
                        ? 
                        <button onClick={this.cambiarCargarMas}>Cargar más</button>
                        : null
                     }
                   </div>
                : 
                <h1>Cargando...</h1>
                
                }
            </div>
        )
    }
}

export default TodasCartelera