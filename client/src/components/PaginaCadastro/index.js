import React from 'react'
import { Erro } from '../erro'

const PaginaCadastro = ({ erro, children, handleEditar, handleCadastrar, editando, history }) => (
  <>
    <Erro erro={erro} />
    {children}
    <div className='row'>
      <div className='col-md-6'>
        <button
          onClick={() => history.goBack()}
          type='button' className='btn btn-danger'
        >Voltar
        </button>
      </div>
      <div className='col-md-6'>
        {
          editando
            ? (<button onClick={handleEditar} className='btn btn-secondary float-right'>Salvar Edição</button>)
            : (
              <button onClick={handleCadastrar} type='button' className='btn btn-secondary float-right'>
                     Cadastrar
              </button>
            )
        }
      </div>
    </div>
  </>
)

export default PaginaCadastro
