import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import api from '../../services/api'
import { formatarDataHora } from '../../helper/formatarData'

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

  handleInativar = async id => {
    const url = `/api/reservas/inativar?id=${id}`
    await api.get(url)
    this.listar()
  }

  render () {
    const { reservas } = this.state
    return (
      <form>
        <h1 className='titulo'>Lista de Reservas</h1>
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
            {reservas && mostarDadosNaTabela(reservas, this.handleInativar)}
          </tbody>
        </table>
        <Link to='reservas/cadastrar' className='btn btn-secondary float-right'> Nova Reserva </Link>
      </form>
    )
  }
}

const mostarDadosNaTabela = (reservas, handleInativar) => {
  console.log(reservas)
  return (
    reservas && reservas.map(reserva =>
      <tr key={reserva.id} className={`${reserva.ativa ? 'reserva-ativa' : 'reserva-inativa'}`}>
        <td>{reserva.cliente.resumo}</td>
        <td>
          {reserva.armaLocadas.map(arma => arma.quantidade).reduce((acc, val) => acc + val)}
        </td>
        <td>{reserva.ambiente.resumo}</td>
        <td>{formatarDataHora(reserva.inicioDaLocacao)}</td>
        <td>{formatarDataHora(reserva.fimDaLocacao)}</td>
        <td align='center'>

          <Link to={`/app/reservas/${reserva.id}`}>
            <i className='fa  fas fa-edit' style={{ fontSize: 40, marginRight: 10 }} title='Editar Arma' />
          </Link>

          <Link style={{ visibility: !reserva.ativa ? 'hidden' : '' }} to=''>
            <i className='fa  fas fa-ban' style={{ fontSize: 40 }} title='Desmarcar' onClick={() => handleInativar(reserva.id)} />
          </Link>

        </td>
      </tr>
    )

  )
}

export default withRouter(Reservas)
