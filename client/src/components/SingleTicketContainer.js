import React, { Component } from 'react'
import SingleTicket from './SingleTicket'
import { fetchEventsAndRelations } from '../store/actions/events'
import { connect } from 'react-redux'

class SingleTicketContainer extends Component {
  componentDidMount() {
    if (!this.props.currentTicket) this.props.fetchEventsAndRelations()
  }
  render() {
    console.log(this.props.currentTicket)
    console.log(this.props.currentEvent)

    return (
      this.props.currentTicket &&
      this.props.currentEvent && (
        <SingleTicket
          ticket={this.props.currentTicket}
          event={this.props.currentEvent}
        />
      )
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

  return {
    // events: state.events && state.events.map(event => event.event)
    currentEvent:
      state.events &&
      state.events.find(data => data.event.id === currentTicket.eventId).event,
    currentTicket
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(SingleTicketContainer)
