import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { checkJWT } from '../../lib/checkJWT'
import history from '../../lib/history'
import { fetchEventsAndRelations } from '../../store/actions/events'
import { addTicket } from '../../store/actions/tickets'
import { logout } from '../../store/actions/users'
import SellTicketForm from './SellTicketForm'

class EditTicketFormContainer extends PureComponent {
  state = {}

  async componentDidMount() {
    if (!this.props.currentUser) {
      return history.replace('/login')
    }

    const isAuth = await checkJWT(this.props.currentUser.token)
    if (!isAuth) {
      this.props.logout()
      return history.replace('/login')
    }

    if (!this.props.currentEvent) {
      this.props.fetchEventsAndRelations()
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addTicket(this.state, this.props.match.params.eventId)
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    if (!this.props.currentEvent) return null
    const event = this.props.currentEvent
    return (
      <div>
        {this.props.message ? (
          <p style={{ color: 'red' }}>{this.props.message}</p>
        ) : null}
        <h1>Sell ticket of : {event.name}</h1>
        <SellTicketForm
          price={this.state.price}
          description={this.state.description}
          image={this.state.image}
          event={this.props.currentEvent}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapSateToProps = (state, props) => ({
  currentEvent:
    state.events &&
    state.events
      .map(data => data.event)
      .find(event => event.id === Number(props.match.params.eventId)),
  currentUser: state.currentUser
})

export default connect(
  mapSateToProps,
  { fetchEventsAndRelations, addTicket, logout }
)(EditTicketFormContainer)
