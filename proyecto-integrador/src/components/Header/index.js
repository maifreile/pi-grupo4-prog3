import React from 'react';
import './styles.css';
import Opcion from '../OpcionHeader/index';

const opciones= [ 
    {
        nombre: 'Home',
        ruta: '/'
    },
    {
        nombre: 'Favoritos',
        ruta: '/favoritos'
    },
    {
        nombre: 'Populares',
        ruta: '/populares'
    },
    {
        nombre: 'Cartelera',
        ruta: '/cartelera'
    }

]

function Header() {
    return(
        <nav>
        <img src='/imgs/logo.jpg' alt='' className='logo'/>
        <ul className="main-nav">
            {
            opciones.map((elm) => <Opcion data= {elm} /> )
            }
        </ul>
        
    </nav>
    )
}

export default Header;