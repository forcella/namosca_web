import React, { Component } from 'react'
import api from '../../services/api'
import PaginaCadastro from '../../components/PaginaCadastro'
import { withRouter } from 'react-router-dom'

class Cliente extends Component {
  state={
    primeiroNome: '',
    ultimoNome: '',
    cpf: '',
    rg: '',
    telefone: '',
    dataNascimento: '',
    ativo: true,
    erro: ''
  }

  componentDidMount () {
    this.editando() && this.buscar()
  }

  buscar = async () => {
    try {
      const url = `/api/clientes/${this.getId()}`
      const response = await api.get(url)
      const { data } = response
      this.setState(data)
    } catch (err) {
      console.log(err.data.message)
      this.setState({ erro: err.data.message })
    }
  }

editando =() => (this.getId() !== 'cadastrar')

 getId = () => this.props.match.params.id

 handleCadastrar= async () => {
   const { primeiroNome, ultimoNome, cpf, rg, telefone, dataNascimento, ativo } = this.state
   try {
     await api.post('/api/clientes', { primeiroNome, ultimoNome, cpf, rg, telefone, dataNascimento, ativo })
     this.props.history.goBack()
   } catch (err) {
     this.handleErroValidacao(err)
   }
 }

handleErroValidacao =(err) => {
  const { errors } = err.data
  if (Array.isArray(errors)) {
    const erros = errors.map(e => `*${e}\n`)
    this.setState({ erro: erros })
    console.log(erros)
  } else if (err.data.message) {
    this.setState({ erro: err.data.message })
  } else {
    this.setState({ erro: 'Erro não mapeado' })
  }
}

 handleEditar= async () => {
   const { primeiroNome, ultimoNome, cpf, rg, telefone, dataNascimento, ativo } = this.state
   try {
     await api.put(`/api/clientes/${this.getId()}`, { primeiroNome, ultimoNome, cpf, rg, telefone, dataNascimento, ativo })
     this.props.history.goBack()
   } catch (err) {
     this.handleErroValidacao(err)
   }
 }

 handleChange = (event) => {
   const { id, value } = event.target
   this.setState({ [id]: value })
 }

 render () {
   const { primeiroNome, ultimoNome, cpf, rg, telefone, dataNascimento, ativo, erro } = this.state
   const propiedades = {
     erro,
     handleEditar: this.handleEditar,
     handleCadastrar: this.handleCadastrar,
     editando: this.editando(),
     history: this.props.history
   }
   return (
     <PaginaCadastro {...propiedades}>
       <form>
         <div className='form-row'>
           <div className='form-group col-md-6'>
             <label htmlFor='primeiroNome'>Cliente</label>
             <input
               id='primeiroNome' className='form-control' placeholder='Primeiro Nome'
               required value={primeiroNome} onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-6'>
             <label htmlFor='ultimoNome'>Cliente</label>
             <input
               id='ultimoNome' className='form-control' placeholder='Sobre Nome'
               required value={ultimoNome} onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-6'>
             <label htmlFor='cpf'>CPF</label>
             <input
               id='cpf' className='form-control' placeholder='CPF do cliente'
               value={cpf} onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-6'>
             <label htmlFor='rg'>RG</label>
             <input
               id='rg' className='form-control' placeholder='RG do cliente'
               value={rg} onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-5'>
             <label htmlFor='telefone'>Telefone</label>
             <input
               id='telefone' className='form-control' placeholder='(45) 99999-9999'
               value={telefone} onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-5'>
             <label htmlFor='dataNascimento'>Nascimento</label>
             <input
               id='dataNascimento' className='form-control' placeholder='dd/mm/aaaa'
               type='date' value={dataNascimento} onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-2'>
             <label htmlFor='ativo'>Ativo</label>
             <select id='ativo' className='form-control' value={ativo} onChange={this.handleChange}>
               <option value='true'>Sim</option>
               <option value='false'>Não</option>
             </select>
           </div>
         </div>
       </form>
     </PaginaCadastro>
   )
 }
}

export default withRouter(Cliente)
