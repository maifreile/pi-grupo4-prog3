import React from "react";
import { Link } from "react-router-dom";
import PeliculasPopulares from "../components/PeliculasPopulares";
import PeliculasCartelera from "../components/PeliculasCartelera";


function Home() {
    return(
        <React.Fragment>
            <main>

                <h1 className="titulos">Populares</h1>
                <section>
                    <PeliculasPopulares/>
                    <Link to="/populares" > <button>Ver todas</button></Link> 
                </section>

                <h1 className="titulos">En cartelera</h1>
                <section>
                    <PeliculasCartelera/>
                    <Link to="/cartelera" > <button>Ver todas</button></Link>

                </section>

            </main>
        </React.Fragment>
    )
}

export default Home