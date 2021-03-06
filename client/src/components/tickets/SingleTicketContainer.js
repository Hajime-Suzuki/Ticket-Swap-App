import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../../store/actions/events'
import SingleTicket from './SingleTicket'

class SingleTicketContainer extends Component {
  componentDidMount() {
    if (!this.props.currentTicket) {
      this.props.fetchEventsAndRelations()
    }
  }

  render() {
    if (!this.props.currentTicket || !this.props.currentEvent) return null
    return (
      <SingleTicket
        ticket={this.props.currentTicket}
        event={this.props.currentEvent}
        tickets={this.props.currentTickets}
        currentUser={this.props.currentUser}
      />
    )
  }
}

const mapSateToProps = (state, props) => {
  const { ticketId } = props.match.params

  const currentTicket =
    state.events &&
    state.events
      .reduce((arr, data) => {
        return [...arr, ...data.tickets]
      }, [])
      .find(ticket => ticket.id === Number(ticketId))

  const currentEventData =
    state.events &&
    state.events.find(data => {
      return currentTicket ? data.event.id === currentTicket.eventId : false
    })
  return {
    currentEvent: currentEventData && currentEventData.event,
    currentTickets: currentEventData && currentEventData.tickets,
    currentTicket,
    currentUser: state.currentUser
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(SingleTicketContainer)
