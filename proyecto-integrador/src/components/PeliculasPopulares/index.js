import React, {Component} from "react";
import PeliculaPopular from "../PeliculaPopular";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css'
const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1'

class PeliculasPopulares extends Component {
    constructor(props) {
        super(props)
        this.state= {
            peliculasMasPopulares: [],
            verTodoPopulares: false,
            cargando: true
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`)
        
        .then((resp) => resp.json())

        .then((data) => {
            setTimeout(() => {
                this.setState({
                    peliculasMasPopulares: data.results,
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
      irADetalle() {
    this.props.history.push(`/detalle/${this.state.id}`);
  }

    render(){
        return(
            <div className='cardContainer'>
                {this.state.cargando ? (
                    <div>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <h1 className="cargando">Cargando...</h1>
                    </div>
                ) : (
              this.state.peliculasMasPopulares.length > 0
                ?
                this.state.peliculasMasPopulares.slice(0,5).map((elm)=> <PeliculaPopular data={elm}/>)
                :
                <h1>Cargando...</h1>
            )}
        </div>
        )
    }
}

export default PeliculasPopulares