import { Typography } from '@material-ui/core'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { checkJWT } from '../../lib/checkJWT'
import history from '../../lib/history'
import { createEvent } from '../../store/actions/events'
import { logout } from '../../store/actions/users'
import CreateEventForm from './CreateEventForm'

class CreateEventFormContainer extends PureComponent {
  state = {}

  async componentDidMount() {
    if (!this.props.currentUser || !this.props.currentUser.admin) {
      return history.replace('/login')
    }

    const isAuth = await checkJWT(this.props.currentUser.token)
    if (!isAuth) {
      this.props.logout()
      return history.replace('/login')
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createEvent(this.state)
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    if (!this.props.currentUser) return null
    return (
      <div>
        <Typography variant="display3">Create Event</Typography>
        <CreateEventForm
          name={this.state.name}
          description={this.state.description}
          image={this.state.image}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapSateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(
  mapSateToProps,
  { logout, createEvent }
)(CreateEventFormContainer)
