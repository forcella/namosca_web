import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { isAuthenticated } from './services/autenticar'

import Registrar from './pages/registrar'
import Logar from './pages/logar'
import Menu from './components/menu'

import { Reserva, Reservas } from './pages/reserva'
import { Cliente, Clientes } from './pages/cliente'
import { Arma, Armas } from './pages/arma'
import { Ambiente, Ambientes } from './pages/ambiente'

const RotaPrivada = ({ component: Component, exact, path, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated()
        ? <Route
          exact={exact} path={path} render={(props) => (
            <div>
              <Menu caminho={path} />
              <div className='container conteudo'>
                <Component {...props} />
              </div>
            </div>
          )}
          />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
  />
)

const RotaPublica = ({ component: Component, exact, path, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated()
        ? <Route
          exact={exact} path={path} render={(props) => (
            <Component {...props} />
          )}
          />
        : <Redirect to={{ pathname: '/app/reservas', state: { from: props.location } }} />}
  />
)

const Rotas = () => (
  <BrowserRouter>
    <Switch>
      <RotaPublica exact path='/' component={Logar} />
      <RotaPublica path='/registrar' component={Registrar} />
      <RotaPrivada exact path='/app/reservas' component={Reservas} />
      <RotaPrivada exact path='/app/reservas/:id' component={Reserva} />
      <RotaPrivada exact path='/app/clientes' component={Clientes} />
      <RotaPrivada exact path='/app/clientes/:id' component={Cliente} />
      <RotaPrivada exact path='/app/armas' component={Armas} />
      <RotaPrivada exact path='/app/armas/:id' component={Arma} />
      <RotaPrivada exact path='/app/ambientes' component={Ambientes} />
      <RotaPrivada exact path='/app/ambientes/:id' component={Ambiente} />
      <Route component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Rotas
