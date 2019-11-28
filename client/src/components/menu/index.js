import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Menu extends Component {
  render () {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/app'>
                NAMOSCA
        </Link>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item '>
              <Link className='nav-link' to='/app/reservas'>
                    Reservas
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' to='/app/clientes'>
                    Clientes
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' to='/app/ambientes'>
                    Ambientes
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' to='/app/armas'>
                    Armas
              </Link>
            </li>
          </ul>
          <form className='form-inline my-2 my-lg-0'>
            <button className='btn btn-outline-secondary my-2 my-sm-0' type='button'>Sair</button>
          </form>
        </div>
      </nav>
    )
  }
}

export { Menu }
