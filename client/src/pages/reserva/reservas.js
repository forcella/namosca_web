import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import api from '../../services/api'
import {formatarDataHora} from '../../helper/formatarData'

class Reservas extends Component {
  state = {
    reservas: [],
    pagina: 0,
    tamanho: 20,
    elementos: 0,
    busca: ''
  }

  componentDidMount = () => {
    this.listar()
  }

  listar = async () => {
    const { busca, pagina, tamanho } = this.state
    const url = `/api/reservas?busca=${busca}&pagina=${pagina}&tamanho=${tamanho}`
    const response = await api.get(url)
    console.log(response)
    const { content, numberOfElements } = response.data
    this.setState({ reservas: content, elementos: numberOfElements })
  }

  render () {
    const {reservas} = this.state
    return (
      <form>
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Cliente</th>
              <th scope='col'>Armas</th>
              <th scope='col'>Ambiente</th>
              <th scope='col'>Inicio</th>
              <th scope='col'>Fim</th>
              <th scope='col' />
            </tr>
          </thead>
          <tbody>
            {mostarDadosNaTabela(reservas)}
          </tbody>
        </table>
        <Link to='reservas/cadastrar' className='btn btn-secondary float-right'> Nova Reserva </Link>
      </form>
    )
  }
}

const mostarDadosNaTabela = (reservas) => {
  return (
    reservas && reservas.map(reserva =>
      <tr key={reserva.id}>
        <td>{reserva.cliente}</td>
        <td>{reserva.qtdArmas}</td>
        <td>{formatarDataHora(reserva.inicio)}</td>
        <td>{formatarDataHora(reserva.fim)}</td>
        <td align='center'>
          <Link to={`/app/reservas/${reserva.id}`}>
            <i className='fa  fas fa-edit' style={{ fontSize: 40, marginRight: 10 }} title='Editar Arma' />
          </Link>

          {/* <i className='fa  fas fa-ban' style={{ fontSize: 40 }} title='Excluir' /> */}
        </td>
      </tr>
    )

  )
}

export default withRouter(Reservas)
