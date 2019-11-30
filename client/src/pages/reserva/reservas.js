import React, { Component } from 'react'

class Reservas extends Component {
  render () {
    return (
      <form>
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Cliente</th>
              <th scope='col'>Arma</th>
              <th scope='col'>Ambiente</th>
              <th scope='col'>Inicio</th>
              <th scope='col'>Fim</th>
              <th scope='col' />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jão</td>
              <td>Taurus .45</td>
              <td>Barraco</td>
              <td>06/07/19 14:00</td>
              <td>06/07/19 16:00</td>
              <td>
                <i className='fa  fas fa-edit' style={{ fontSize: 40, marginRight: 10 }} title='Editar Reserva' />
                <i className='fa  fas fa-ban' style={{ fontSize: 40 }} title='Desmarcar Reserva' />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit' className='btn btn-secondary float-right'>Nova Reserva</button>
      </form>
    )
  }
}

export default Reservas
