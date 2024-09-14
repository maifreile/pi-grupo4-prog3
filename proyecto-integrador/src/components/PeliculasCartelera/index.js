import React, {Component} from "react";
import CardPelicula from '../CardPelicula'
import './styles.css'
const APIKEY = '72c246bb35885b3ab17e1a50707d1bf1'

class PeliculasCartelera extends Component {
    constructor(props) {
        super(props)
        this.state= {
            peliculasEnCartelera: [],
            
        }
        console.log('Soy el constructor');
        
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}`)
       
        .then((resp) => resp.json())

        .then((data) => {
            this.setState({
                peliculasEnCartelera: data.results
              })  
        })

        .catch ((error)=> console.log(error)) 
        
    }

    componentDidUpdate(){
        console.log('soy el didUpdate');
        
    }

    componentWillUnmount(){
        console.log('soy el willUnmount');
        
    }

    render(){
    
        return(
       
            <div className='cardContainer'>
                {   this.state.peliculasEnCartelera && this.state.peliculasEnCartelera.length > 0
                    ?
                    this.state.peliculasEnCartelera.slice(0,5).map((elm)=> <CardPelicula data={elm}/>)
                    :
                    null
                }
            </div>
    
        )
    }
}

export default PeliculasCartelera