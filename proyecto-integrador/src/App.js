import {Switch, Route} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Home from './screens/Home'
import PeliculasPopulares from './components/PeliculasPopulares'
import PeliculasCartelera from './components/PeliculasCartelera'
import NotFound from './screens/NotFound'

function App(props) {
  return (
    <>
    <Header/>
    <Switch>
      <Route path= '/' exact={true} component={Home} />
      <Route path= '/populares'  component={PeliculasPopulares} />
      <Route path= '/cartelera'  component={PeliculasCartelera} />
      <Route path= '' component={NotFound} />
    </Switch>
    <Footer/>
    </>
    )}

  export default App