import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import api from '../../services/api'
import { formatarData } from '../../helper/formatarData'

class Clientes extends Component {
  state = {
    clientes: [],
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
    const url = `/api/clientes?busca=${busca}&pagina=${pagina}&tamanho=${tamanho}`
    const response = await api.get(url)
    const { content, numberOfElements } = response.data
    this.setState({ clientes: content, elementos: numberOfElements })
  }

  render () {
    const { clientes } = this.state
    return (
      <form>
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Nome</th>
              <th scope='col'>CPF</th>
              <th scope='col'>RG</th>
              <th scope='col'>Telefone</th>
              <th scope='col'>Nascimento</th>
              <th scope='col'>Ativo</th>
              <th align='center' scope='col' />
            </tr>
          </thead>
          <tbody>
            {mostarDadosNaTabela(clientes)}
          </tbody>
        </table>
        <Link to='clientes/cadastrar' className='btn btn-secondary float-right'> Adicionar Cliente </Link>
      </form>
    )
  }
}
const mostarDadosNaTabela = (clientes) => {
  return (
    clientes && clientes.map(cliente =>
      <tr key={cliente.id}>
        <td>{cliente.primeiroNome + ' ' + cliente.ultimoNome}</td>
        <td>{cliente.cpf}</td>
        <td>{cliente.rg}</td>
        <td>{cliente.telefone}</td>
        <td>{formatarData(cliente.dataNascimento)}</td>
        <td>{cliente.ativo ? 'SIM' : 'NÃO'}</td>
        <td align='center'>
          <Link to={`/app/clientes/${cliente.id}`}>
            <i className='fa  fas fa-edit' style={{ fontSize: 40, marginRight: 10 }} title='Editar Reserva' />
          </Link>

          {/* <i className='fa  fas fa-ban' style={{ fontSize: 40 }} title='Excluir' /> */}
        </td>
      </tr>
    )

  )
}
export default withRouter(Clientes)
