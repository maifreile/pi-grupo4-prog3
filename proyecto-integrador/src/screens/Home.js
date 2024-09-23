import React from "react";
import { Link } from "react-router-dom";
import PeliculasPopulares from "../components/PeliculasPopulares";
import PeliculasCartelera from "../components/PeliculasCartelera";
import HomeForm from "../components/HomeForm";


function Home(props) {
    return(
        <React.Fragment>
            <main>
                
                <HomeForm history={props.history}/>
                
                <h1 className="titulos">Populares</h1>
                <section className="contenedor">
                    <PeliculasPopulares/>
                    <Link to="/populares"> <button className="verTodas" >Ver todas</button></Link> 
                </section>

                <h1 className="titulos">En cartelera</h1>
                <section  className="contenedor">

                    <PeliculasCartelera/>
                    <Link to="/cartelera"> <button className="verTodas" >Ver todas</button></Link>
                </section>

            </main>
        </React.Fragment>
    )
}

export default Home