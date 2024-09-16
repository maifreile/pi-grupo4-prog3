import {Route, Switch} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Home from './screens/Home'
import DetallePelicula from './components/DetallePelicula'
// import NotFound from './screens/NotFound'


function App(props) {
  return (
    <>
    <Header/>
    <Switch>
      <Route path= '/' exact={true} component={Home} />
      <Route path= '/detallePelicula/:id' exact={true} component={DetallePelicula} /> Que me lleve al detalle de la pelicula
      {/* <Route path="/detallePelicula/:id" component={DetallePeliculaWrapper} /> */}
      {/* <Route path= '' component={NotFound} /> */}
    </Switch>
    <Footer/>
    </>
    )}

  export default App