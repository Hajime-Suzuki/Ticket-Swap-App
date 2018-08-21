import React, { Component } from 'react'
import SingleTicket from './SingleTicket'
import { fetchEventsAndRelations } from '../store/actions/events'
import { connect } from 'react-redux'
import axios from 'axios'
import { calculateFraudRisk } from '../lib/calculateFraudRisk'

class SingleTicketContainer extends Component {
  state = {
    count: null
  }
  componentDidMount() {
    if (!this.props.currentTicket) {
      this.props.fetchEventsAndRelations()
    }
    axios
      .get(
        `http://localhost:4000/users/count-tickets/${
          this.props.match.params.ticketId
        }`
      )
      .then(({ data }) => this.setState({ count: data }))
  }

  render() {
    // console.log(this.props.currentTicket)
    // console.log(this.props.currentTickets)

    return (
      this.props.currentTicket &&
      this.props.currentEvent && (
        <SingleTicket
          ticket={this.props.currentTicket}
          event={this.props.currentEvent}
          tickets={this.props.currentTickets}
          count={this.state.count}
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

  const currentEventData =
    state.events &&
    state.events.find(data => data.event.id === currentTicket.eventId)

  return {
    currentEvent: currentEventData && currentEventData.event,
    currentTickets: currentEventData && currentEventData.tickets,
    currentTicket
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(SingleTicketContainer)
