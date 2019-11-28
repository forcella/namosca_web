import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { isAuthenticated } from './services/autenticar'

import Registrar from './pages/registrar'
import Logar from './pages/logar'
import principal from './pages/principal'
import { Menu } from './components/menu'

const PrivateRoute = ({ component: Component, exact, path, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated()
        ? <Route
          exact={exact} path={path} render={(props) => (
            <div>
              <Menu />
              <Component {...props} />
            </div>
          )}
        />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
  />
)

const Rotas = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Logar} />
      <Route path='/registrar' component={Registrar} />
      <PrivateRoute exact path='/app/reservas' component={() => <h1>RESERVAS</h1>} />
      <PrivateRoute exact path='/app/clientes' component={() => <h1>clientes</h1>} />
      <PrivateRoute exact path='/app/ambientes' component={() => <h1>ambientes</h1>} />
      <PrivateRoute exact path='/app/armas' component={() => <h1>armas</h1>} />
      <Route component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

PrivateRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.any
}

export default Rotas
