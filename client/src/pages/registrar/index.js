import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

import Logo from '../../assets/logo.svg'

import api from '../../services/api'

import { Form, Container } from '../../estilos/registroLogar'

class Logar extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

handleSignUp = async e => {
  e.preventDefault()
  const { email, password } = this.state
  if (!email || !password) {
    this.setState({ error: 'Preencha todos os dados para se cadastrar' })
  } else {
    try {
      await api.post('/api/registrar', { email, password })
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Ocorreu um erro ao registrar sua conta. T.T' })
    }
  }
}

render () {
  return (
    <Container>
      <Form onSubmit={this.handleSignUp}>
        <img src={Logo} alt='Logo' />
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
        <button type='submit'>Cadastrar</button>
        <hr />
        <Link to='/'>Fazer login</Link>
      </Form>
    </Container>
  )
}
}
Logar.propTypes = {
  history: PropTypes.any
}

export default withRouter(Logar)
