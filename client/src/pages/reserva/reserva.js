/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import PaginaCadastro from '../../components/PaginaCadastro'
import { withRouter } from 'react-router-dom'
import api from '../../services/api'

class Reserva extends Component {
  state = {
    clienteSelecionado: '',
    ambienteSelecionado: '',
    armaSelecionada: '',
    armasNaReserva: [],
    listaArmas: [],
    quantidade: 1,
    inicioDaLocacao: '',
    fimDaLocacao: '',
    ativa: true,
    listaAmbientes: [],
    listaClientes: [],
    erros: ''
  }

  componentDidMount () {
    this.listarArmas()
    this.listarAmbientes()
    this.listarClientes()
    this.editando() && this.buscar()
  }

  editando =() => (this.getId() !== 'cadastrar')

  buscar = async () => {
    try {
      const url = `/api/reservas/${this.getId()}`
      const response = await api.get(url)
      const { data } = response

      this.setState({ ...data })
      data.armasLocadas.forEach(arma => {
        this.setState({ armaSelecionada: arma.id, quantidade: arma.quantidade }, this.handleAdicionaArma)
      })
    } catch (err) {
      this.setState({ erro: err.data.message })
    }
  }

  listarArmas = async () => {
    const url = '/api/armas?busca=&pagina=0&tamanho=50'
    const response = await api.get(url)
    const { content } = response.data
    this.setState({ listaArmas: content })
  }

  listarAmbientes = async () => {
    const url = '/api/ambientes?busca=&pagina=0&tamanho=50'
    const response = await api.get(url)
    const { content } = response.data
    this.setState({ listaAmbientes: content })
  }

  listarClientes = async () => {
    const url = '/api/clientes?busca=&pagina=0&tamanho=50&ativo=true'
    const response = await api.get(url)
    const { content } = response.data
    this.setState({ listaClientes: content })
  }

  handleChange = (event) => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  handleAdicionaArma = () => {
    const { armaSelecionada, listaArmas, armasNaReserva, quantidade } = this.state
    const arma = listaArmas.find(arma => +armaSelecionada === +arma.id)
    const opcoesRestantes = listaArmas.filter(arma => +armaSelecionada !== +arma.id)

    !!arma && this.setState({
      armasNaReserva: [...armasNaReserva, { ...arma, quantidade }],
      listaArmas: opcoesRestantes,
      quantidade: 1
    })
  }

  onRemoveArma = arma => {
    const { listaArmas, armasNaReserva } = this.state
    const armasRestantesNaReserva = armasNaReserva.filter(reserva => +reserva.id !== arma.id)

    !!arma && this.setState({
      armasNaReserva: armasRestantesNaReserva,
      listaArmas: [arma, ...listaArmas],
      armaSelecionada: '',
      quantidade: 1
    })
  }

  getId = () => this.props.match.params.id

  handleCadastrar= async () => {
    const { clienteSelecionado, ambienteSelecionado, inicioDaLocacao, fimDaLocacao, armasNaReserva, ativa } = this.state
    const armasLocadas = armasNaReserva.map(arma => ({ id: arma.id, quantidade: arma.quantidade }))
    try {
      await api.post('/api/reservas', { clienteSelecionado, ambienteSelecionado, inicioDaLocacao, fimDaLocacao, armasLocadas, ativa })
      this.props.history.goBack()
    } catch (err) {
      this.setState({ erro: err.data.message })
    }
  }

    handleEditar= async () => {
      const { clienteSelecionado, ambienteSelecionado, inicioDaLocacao, fimDaLocacao, armasNaReserva, ativa } = this.state
      const armasLocadas = armasNaReserva.map(arma => ({ id: arma.id, quantidade: arma.quantidade }))
      try {
        await api.put(`/api/reservas/${this.getId()}`, { clienteSelecionado, ambienteSelecionado, inicioDaLocacao, fimDaLocacao, armasLocadas, ativa })
        this.props.history.goBack()
      } catch (err) {
        console.log(err)
        // this.setState({ erro: err.data.message })
      }
    }

    render () {
      const {
        armaSelecionada, armasNaReserva, listaArmas, quantidade, ambienteSelecionado,
        listaAmbientes, clienteSelecionado, listaClientes, inicioDaLocacao, fimDaLocacao, erro
      } = this.state

      const propiedades = {
        erro,
        handleEditar: this.handleEditar,
        handleCadastrar: this.handleCadastrar,
        editando: this.editando(),
        history: this.props.history
      }
      console.log(this.editando())
      return (
        <PaginaCadastro {...propiedades}>
          <form>
            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='clienteSelecionado'>Cliente</label>
                <select id='clienteSelecionado' className='form-control' value={clienteSelecionado} onChange={this.handleChange}>
                  <option>Selecione um cliente</option>
                  <MostrarOpcoes opcoes={listaClientes} />
                </select>
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='ambienteSelecionado'>Ambiente</label>
                <select id='ambienteSelecionado' className='form-control' value={ambienteSelecionado} onChange={this.handleChange}>
                  <option>Selecione um ambiente</option>
                  <MostrarOpcoes opcoes={listaAmbientes} />
                </select>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-3'>
                <label htmlFor='inicioDaLocacao'>Data Início</label>
                <input
                  type='datetime-local' className='form-control' id='inicioDaLocacao'
                  value={inicioDaLocacao} onChange={this.handleChange}
                />
              </div>
              <div className='form-group col-md-3'>
                <label htmlFor='fimDaLocacao'>Data Fim</label>
                <input
                  type='datetime-local' className='form-control' id='fimDaLocacao'
                  value={fimDaLocacao} onChange={this.handleChange}
                />
              </div>
              <div className='form-group col-md-4'>
                <label htmlFor='armaSelecionada'>Armas</label>
                <select id='armaSelecionada' className='form-control' value={armaSelecionada} onChange={this.handleChange}>
                  <option value={null}>Selecione uma arma</option>
                  <MostrarOpcoes opcoes={listaArmas} />
                </select>
              </div>
              <div className='form-group col-md-1'>
                <label htmlFor='quantidade'>quantidade</label>
                <input type='number' className='form-control' id='quantidade' value={quantidade} onChange={this.handleChange} />
              </div>
              <div className='form-group col-md-1'>
                <label htmlFor='ambiente'>Add</label>
                <input
                  type='button' className='form-control btn btn-secondary' id='inputAddress'
                  value='+' onClick={this.handleAdicionaArma}
                />
              </div>
            </div>
            <table className='table table-hover'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>Arma</th>
                  <th scope='col'>Marca</th>
                  <th scope='col'>Calibre</th>
                  <th scope='col'>Qtd</th>
                  <th scope='col' />
                </tr>
              </thead>
              <tbody>
                <ArmasNaReserva armas={armasNaReserva} remover={this.onRemoveArma} />
              </tbody>
            </table>
          </form>
        </PaginaCadastro>
      )
    }
}

const MostrarOpcoes = ({ opcoes }) => {
  return (
    <>
      {opcoes && opcoes.map(op =>
        <option key={op.id} value={op.id}>{op.resumo}</option>)}
    </>
  )
}

const ArmasNaReserva = ({ armas, remover }) => {
  return (
    armas && armas.map(arma =>
      <tr key={`arma_${arma.id}`}>
        <td>{arma.descricao}</td>
        <td>{arma.marca}</td>
        <td>{arma.calibre}</td>
        <td>{arma.quantidade}</td>
        <td align='center'>
          <i
            className='fa  fas fa-ban' style={{ fontSize: 40, marginRight: 10 }} title='Remover'
            onClick={() => remover(arma)}
          />
        </td>
      </tr>
    )
  )
}

export default Reserva
