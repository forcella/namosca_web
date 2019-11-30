import React, { Component } from 'react'
import PaginaCadastro from '../../components/PaginaCadastro'
import api from '../../services/api'

class Ambiente extends Component {
  state = {
    descricao: '',
    area: '',
    alvo: true,
    erro: ''
  }

  componentDidMount () {
    this.editando() && this.buscar()
  }

  buscar = async () => {
    try {
      const url = `/api/ambientes/${this.getId()}`
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
   const { descricao, area, alvo } = this.state
   try {
     await api.post('/api/ambientes', { descricao, area, alvo })
     this.props.history.goBack()
   } catch (err) {
     this.setState({ erro: err.data.message })
   }
 }

 handleEditar= async () => {
   const { descricao, area, alvo } = this.state
   try {
     await api.put(`/api/ambientes/${this.getId()}`, { descricao, area, alvo })
     this.props.history.goBack()
   } catch (err) {
     this.setState({ erro: err.data.message })
   }
 }

 handleChange = (event) => {
   const { id, value } = event.target
   this.setState({ [id]: value })
 }

 render () {
   const { descricao, area, alvo, erro } = this.state
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
           <div className='form-group col-md-12'>
             <label htmlFor='descricao'>Descricao</label>
             <input
               id='descricao' className='form-control' placeholder='Descrição do ambiente'
               value={descricao} onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-2'>
             <label htmlFor='area'>Área</label>
             <input
               id='area' className='form-control' placeholder='Área do ambiente'
               type='number' value={area} onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-2'>
             <label htmlFor='alvo'>Alvo</label>
             <select id='alvo' className='form-control' value={alvo} onChange={this.handleChange}>
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

export default Ambiente
