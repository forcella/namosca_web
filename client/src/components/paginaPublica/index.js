import React, { Component } from 'react'
import { isAuthenticated } from '../../services/autenticar'
import { withRouter, Redirect } from 'react-router-dom'

class PaginaPublica extends Component {
  render () {
    return (
      <>
        {
          isAuthenticated()
            ? <Redirect to={{ pathname: '/app/reservas', state: { from: this.props.location } }} />
            : this.props.children

        }
      </>
    )
  }
}

export default withRouter(PaginaPublica)
