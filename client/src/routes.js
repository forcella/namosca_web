import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { isAuthenticated } from './services/autenticar'

import Registrar from './pages/registrar'
import Logar from './pages/logar'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated()
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
  />
)

const Rotas = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Logar} />
      <Route path='/registrar' component={Registrar} />
      <PrivateRoute path='/app' component={() => <h1>App</h1>} />
      <Route path='*' component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

PrivateRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.any
}

export default Rotas
