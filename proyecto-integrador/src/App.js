import {Route, Switch} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Home from './screens/Home'

import TodasPopulares from './components/TodasPopulares'
import TodasCartelera from './components/TodasCartelera'

import NotFound from './screens/NotFound'

function App(props) {
  return (
    <>
    <Header/>
    <Switch>
      <Route path= '/' exact={true} component={Home} />

      <Route path= '/populares'  component={TodasPopulares} />
      <Route path= '/cartelera'  component={TodasCartelera} />

      <Route path= '' component={NotFound} />
    </Switch>
    <Footer/>
    </>
    )}

  export default App