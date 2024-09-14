import React from "react";
import PeliculasPopulares from "../components/PeliculasPopulares";
import PeliculasCartelera from "../components/PeliculasCartelera";


function Home() {
    return(
        <React.Fragment>
            <main>
                <h1 className="titulos">Populares</h1>
                <section>
                    <PeliculasPopulares/>
                    
                </section>
                <h1 className="titulos">En cartelera</h1>
                <section>
                    <PeliculasCartelera/>
                    
                </section>
            </main>
        </React.Fragment>
    )
}

export default Home