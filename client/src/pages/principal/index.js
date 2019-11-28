import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu } from '../../components/menu'

class Principal extends Component {
  render () {
    return (
      <div>
        <Menu />
        <span className='container'>
          {this.props.children}
        </span>
      </div>
    )
  }
}

export default withRouter(Principal)
