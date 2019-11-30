import React, { Component } from 'react'
import './estilo.css'

class Erro extends Component {
  state={
    erro: ''
  }

componentWillReceiveProps = (props) => {
  props.erro && this.setState({ erro: props.erro })
}

  render=() => (
    <>
      {
        this.state.erro
          ? <div className='erro'>
            <buttom className='btn float-right' onClick={() => this.setState({ erro: '' })}>X</buttom>
            <p>{this.state.erro}</p>
            </div> : ''
      }
    </>
  )
}

export { Erro }
