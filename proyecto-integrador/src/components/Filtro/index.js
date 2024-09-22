import React, {Component} from "react";
import './style.css';

class Filtro extends Component {
    constructor(props){
        super(props)
        this.state = {
             valorInput: ''
        }
        console.log('Soy el constructor');
    }

    evitarSubmit (event){
        console.log(event)
        event.preventDefault()
    }


    controlarInputs(event){
        this.setState({
            valorInput: event.target.value
        }, () => this.props.filtrarPeliculas(this.state.valorInput)
             //esto se va a ejecutar unicamente cuando el estado se haya actualizado correctamente
        )
        
    }

    render(){
        return(
            <form onSubmit={(event) => this.evitarSubmit(event)} className="formFiltro" >
                <input type='text' placeholder="Fitrar película..." onChange={(event) => this.controlarInputs(event)}
                 value={this.state.valorInput} className="inputFiltro"/>
            </form>
        )
    }
}

export default Filtro;