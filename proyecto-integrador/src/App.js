import {Route, Switch} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Home from './screens/Home'
import Favoritas from './screens/Favoritas'
import Detalle from './screens/Detalle'
import Resultados from './screens/SearchResults'
import TodasPopulares from './components/TodasPopulares'
import TodasCartelera from './components/TodasCartelera'


import NotFound from './screens/NotFound'

function App(props) {
  return (
    <>
    <Header/>
    <Switch>
      <Route path= '/' exact={true} component={Home} />
      <Route path= '/detalle/:id' exact={true} component={Detalle} /> 
      <Route path='/favoritos' component={Favoritas} />
      <Route path= '/populares'  component={TodasPopulares} />
      <Route path= '/cartelera'  component={TodasCartelera} />
      <Route path='/searchResults' component={Resultados} />

      <Route path= '' component={NotFound} />
    </Switch>
    <Footer/>
    </>
    )}

  export default App