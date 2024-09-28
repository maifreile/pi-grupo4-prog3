import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1 className='tituloTodas'>404 - Página no encontrada</h1>
      <p className='tituloTodas'>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/"><i class="fa-solid fa-house"></i>Volver al inicio</Link>
    </div>
  );
};

export default NotFound;