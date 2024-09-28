import { Component } from "react";
import './styles.css'

class HomeForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            peliculas: [],
            busqueda: ''
        }
    }

    evitarSubmit(event) {
        event.preventDefault()
        this.props.history.push('/SearchResults', { busqueda: this.state.busqueda })
    }

    cambioEnInput(event) {
        this.setState({
            busqueda: event.target.value
        })
    }

    render() {
        return (
            <form className="formBusqueda" onSubmit={(event) => this.evitarSubmit(event)}>
                <input className="inputBusqueda" onChange={(event) => this.cambioEnInput(event)}
                    value={this.state.busqueda} placeholder="Buscar pelicula" />
                <button className="botonBusqueda" type="submit">Buscar</button>
            </form>
        );
    }
}
export default (HomeForm); 
