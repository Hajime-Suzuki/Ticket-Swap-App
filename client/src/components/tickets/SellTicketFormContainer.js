import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchEventsAndRelations } from '../../store/actions/events'
import { addTicket } from '../../store/actions/tickets'
import { checkJWT } from '../../lib/checkJWT'
import { logout } from '../../store/actions/users'
import SellTicketForm from './SellTicketForm'
import history from '../../lib/history'

class SellTicketFormContainer extends PureComponent {
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
        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Price
            <input
              type="number"
              name="price"
              value={this.state.price || ''}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              type="text"
              name="description"
              value={this.state.description || ''}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Image
            <input
              type="text"
              name="image"
              value={this.state.image || ''}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit" disabled={!this.state.price}>
            Submit
          </button>
        </form> */}
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
)(SellTicketFormContainer)
