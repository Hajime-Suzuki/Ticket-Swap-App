import React, { Component } from 'react'
import SingleTicket from './SingleTicket'

import { connect } from 'react-redux'

import { userAxios as axios } from '../../axios/instances'
import { fetchEventsAndRelations } from '../../store/actions/events'

class SingleTicketContainer extends Component {
  // state = {
  //   count: null
  // }
  componentDidMount() {
    if (!this.props.currentTicket) {
      this.props.fetchEventsAndRelations()
    }

    // axios
    //   .get(`/count-tickets/${this.props.match.params.ticketId}`)
    //   .then(({ data }) => this.setState({ count: data }))
  }

  render() {
    if (!this.props.currentTicket || !this.props.currentEvent) return null
    return (
      <SingleTicket
        ticket={this.props.currentTicket}
        event={this.props.currentEvent}
        tickets={this.props.currentTickets}
        currentUserId={this.props.currentUserId}
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
    currentUserId: state.currentUser && state.currentUser.id
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(SingleTicketContainer)
