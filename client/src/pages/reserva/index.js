import React, { Component } from 'react'

import { Link, withRouter, Redirect } from 'react-router-dom'

class Reserva extends Component {
  render () {
    return (
      <form>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='cliente'>Cliente</label>
            <select id='cliente' className='form-control'>
              <option selected>Selecione um cliente</option>
              <option>...</option>
            </select>
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='ambiente'>Ambiente</label>
            <select id='ambiente' className='form-control'>
              <option selected>Selecione um ambiente</option>
              <option>...</option>
            </select>
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='inputAddress'>Perído de locação</label>
            <input type='text' className='form-control' id='inputAddress' placeholder='Selecione um período' />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='ambiente'>Armas</label>
            <select id='ambiente' className='form-control'>
              <option selected>Selecione um ambiente</option>
              <option>...</option>
            </select>
          </div>
        </div>
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Arma</th>
              <th scope='col'>Calibre</th>
              <th scope='col'>Marca</th>
              <th scope='col' />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>1</th>
              <td>1911 OFFICER</td>
              <td>.45</td>
              <td>Taurus</td>
              <td><i className='fa fas fa-trash' /></td>
            </tr>
          </tbody>
        </table>
        <button type='submit' className='btn btn-secondary float-right'>Efetuar Reserva</button>
      </form>
    )
  }
}

export default withRouter(Reserva)
