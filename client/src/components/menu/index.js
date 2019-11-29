import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../services/autenticar'
import Logo from '../../assets/icon-alvo.png'


const pagina = {
  reservas: 'reservas',
  clientes: 'clientes',
  ambientes: 'ambientes',
  armas: 'armas'
}

class Menu extends Component {
 
  paginaAtiva = pagina => {
    return this.props.caminho.includes(pagina) ? 'active' : ''
  }

  render () {
    return (
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/app/reservas'>
          <img src={Logo} style={{width: 40}} />
        </Link>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className={`nav-item ${this.paginaAtiva(pagina.reservas)}`}>
              <Link className='nav-link' to={pagina.reservas}>
                    Reservas
              </Link>
            </li>
            <li className={`nav-item ${this.paginaAtiva(pagina.clientes)}`}>
              <Link className='nav-link' to={pagina.clientes}>
                    Clientes
              </Link>
            </li>
            <li className={`nav-item ${this.paginaAtiva(pagina.ambientes)}`}>
              <Link className='nav-link' to={pagina.ambientes}>
                    Ambientes
              </Link>
            </li>
            <li className={`nav-item ${this.paginaAtiva(pagina.armas)}`}>
              <Link className='nav-link' to={pagina.armas}>
                    Armas
              </Link>
            </li>
          </ul>
          <form className='form-inline my-2 my-lg-0'>
            <button
              onClick={() => logout()}
              className='btn btn-outline-secondary my-2 my-sm-0' type='button'
            >Sair
            </button>
          </form>
        </div>
      </nav>
    )
  }
}

export { Menu }
