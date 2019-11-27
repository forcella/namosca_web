import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Logo from '../../assets/logo.svg'
import api from '../../services/api'
import { login } from '../../services/autenticar'

import { Form, Container } from './estilos'

class Registrar extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleSignIn = async e => {
    e.preventDefault()
    const { email, password } = this.state
    if (!email || !password) {
      this.setState({ error: 'Preencha e-mail e senha para continuar!' })
    } else {
      try {
        const response = await api.post('/api/login', { email, password })
        login(response.data.token)
        this.props.history.push('/app')
      } catch (err) {
        this.setState({
          error:
            'Houve um problema com o login, verifique suas credenciais. T.T'
        })
      }
    }
  };

  render () {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt=' logo' />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type='email'
            placeholder='Endereço de e-mail'
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type='password'
            placeholder='Senha'
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type='submit'>Entrar</button>
          <hr />
          <Link to='/registrar'>Criar conta grátis</Link>
        </Form>
      </Container>
    )
  }
}

export default withRouter(Registrar)
