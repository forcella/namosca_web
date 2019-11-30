import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import api from '../../services/api'

class Ambientes extends Component {
  state = {
    ambientes: [],
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
    const url = `/api/ambientes?busca=${busca}&pagina=${pagina}&tamanho=${tamanho}`
    const response = await api.get(url)
    const { content, numberOfElements } = response.data
    this.setState({ ambientes: content, elementos: numberOfElements })
  }

  render () {
    const { ambientes } = this.state
    return (
      <form>
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Descricao</th>
              <th scope='col'>Área</th>
              <th scope='col'>Alvo</th>
              <th align='center' scope='col' />
            </tr>
          </thead>
          <tbody>
            {mostarDadosNaTabela(ambientes)}
          </tbody>
        </table>
        <Link to='ambientes/cadastrar' className='btn btn-secondary float-right'> Adicionar Ambiente </Link>
      </form>
    )
  }
}

const mostarDadosNaTabela = (ambientes) => {
  return (
    ambientes && ambientes.map(ambiente =>
      <tr key={ambiente.id}>
        <td>{ambiente.descricao}</td>
        <td>{ambiente.area}</td>
        <td>{ambiente.alvo ? 'SIM' : 'NÃO'}</td>
        <td align='center'>
          <Link to={`/app/ambientes/${ambiente.id}`}>
            <i className='fa  fas fa-edit' style={{ fontSize: 40, marginRight: 10 }} title='Editar Reserva' />
          </Link>

          {/* <i className='fa  fas fa-ban' style={{ fontSize: 40 }} title='Excluir' /> */}
        </td>
      </tr>
    )

  )
}

export default withRouter(Ambientes)
