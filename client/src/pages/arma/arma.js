import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import api from '../../services/api'
import PaginaCadastro from '../../components/PaginaCadastro'

class Arma extends Component {
  state = {
    id: null,
    descricao: '',
    marca: '',
    calibre: '',
    situacao: 'DISPONIVEL',
    erro: ''
  }

  componentDidMount () {
    this.editando() && this.buscar()
  }

  buscar = async () => {
    try {
      const url = `/api/armas/${this.getId()}`
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
   console.log(this.state)
   const { descricao, marca, calibre, disponivel, situacao } = this.state
   try {
     await api.post('/api/armas', { descricao, marca, calibre, disponivel, situacao })
     this.props.history.goBack()
   } catch (err) {
     this.setState({ erro: err.data.message })
   }
 }

 handleEditar= async () => {
   console.log(this.state)
   const { descricao, marca, calibre, disponivel, situacao } = this.state
   try {
     await api.put(`/api/armas/${this.getId()}`, { descricao, marca, calibre, disponivel, situacao })
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
   const titulo = this.editando() ? 'Editando' : 'Nova'
   const { descricao, marca, calibre, situacao, erro } = this.state

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
         <h1 className='titulo'>{`${titulo} arma`}</h1>
         <div className='form-row'>
           <div className='form-group col-md-12'>
             <label htmlFor='descricao'>Descriçao</label>
             <input
               id='descricao' className='form-control' value={descricao}
               placeholder='Descricao da arma' onChange={this.handleChange}
             />
           </div>
           <div className='form-group col-md-4'>
             <label htmlFor='marca'>Marca</label>
             <select id='marca' className='form-control' onChange={this.handleChange} value={marca}>
               <option value='TAURUS'>Taurus</option>
               <option value='ROSSI'>Rossi</option>
               <option value='CLOCK'>Clock</option>
               <option value='CBC'>CBC</option>
               <option value='CZ'>CZ</option>
             </select>
           </div>
           <div className='form-group col-md-4'>
             <label htmlFor='calibre'>Calibre</label>
             <select id='calibre' className='form-control' onChange={this.handleChange} value={calibre}>
               <option value='CAL_38'>38</option>
               <option value='CAL_9MM'>9MM</option>
               <option value='CAL_388'>388</option>
               <option value='CAL_4_5'>4.5</option>
               <option value='CAL_22'>22</option>
             </select>
           </div>
           <div className='form-group col-md-4'>
             <label htmlFor='situacao'>Situação</label>
             <select id='situacao' className='form-control' onChange={this.handleChange} value={situacao}>
               <option value='DISPONIVEL'>Disponível</option>
               <option value='INDISPONIVEL'>Indisponível</option>
               <option value='MANUTENCAO'>Manutenção</option>
             </select>
           </div>
         </div>
       </form>
     </PaginaCadastro>
   )
 }
}

export default withRouter(Arma)
