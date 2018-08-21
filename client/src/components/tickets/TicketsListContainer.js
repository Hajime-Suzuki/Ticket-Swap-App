import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../../store/actions/events'
import TicketsList from './TicketsList'

class TicketsContainer extends Component {
  componentDidMount() {
    if (!this.props.currentTickets) this.props.fetchEventsAndRelations()
  }

  render() {
    if (!this.props.currentTickets) return null
    console.log(this.props.match.params.eventId)

    return (
      <TicketsList
        tickets={this.props.currentTickets}
        eventId={this.props.match.params.eventId}
      />
    )
  }
}
const mapSateToProps = (state, props) => {
  const { eventId } = props.match.params
  const currentEventData =
    state.events && state.events.find(data => data.event.id === Number(eventId))

  return {
    currentTickets: currentEventData && currentEventData.tickets
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(TicketsContainer)
