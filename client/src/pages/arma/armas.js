import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import api from '../../services/api'

class Armas extends Component {
  state = {
    armas: [],
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
    const url = `/api/armas?busca=${busca}&pagina=${pagina}&tamanho=${tamanho}`
    const response = await api.get(url)
    const { content, numberOfElements } = response.data
    this.setState({ armas: content, elementos: numberOfElements })
  }

  render () {
    const { armas } = this.state
    return (
      <form>
        <h1 className='titulo'>Lista de Armas</h1>
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Descricao</th>
              <th scope='col'>Marca</th>
              <th scope='col'>Calibre</th>
              <th scope='col'>Situaçao</th>
              <th align='center' scope='col' />
            </tr>
          </thead>
          <tbody>
            {mostarDadosNaTabela(armas)}
          </tbody>
        </table>
        <Link to='armas/cadastrar' className='btn btn-secondary float-right'> Adicionar Arma </Link>
      </form>
    )
  }
}

const mostarDadosNaTabela = (armas) => {
  return (
    armas && armas.map(arma =>
      <tr key={arma.id}>
        <td>{arma.descricao}</td>
        <td>{arma.marca}</td>
        <td>{arma.calibre}</td>
        <td>{arma.situacao}</td>
        <td align='center'>
          <Link to={`/app/armas/${arma.id}`}>
            <i className='fa  fas fa-edit' style={{ fontSize: 40, marginRight: 10 }} title='Editar Arma' />
          </Link>

          {/* <i className='fa  fas fa-ban' style={{ fontSize: 40 }} title='Excluir' /> */}
        </td>
      </tr>
    )

  )
}

export default withRouter(Armas)
