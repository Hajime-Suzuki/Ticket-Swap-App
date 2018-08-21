import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../store/actions/events'
import Tickets from './Tickets'

class TicketsContainer extends Component {
  componentDidMount() {
    if (!this.props.currentTickets) this.props.fetchEventsAndRelations()
  }
  render() {
    // console.log(this.props.currentTickets)
    if (!this.props.currentTickets) return null

    return <Tickets tickets={this.props.currentTickets} />
  }
}
const mapSateToProps = (state, props) => {
  const { eventId } = props.match.params

  return {
    events: state.events,
    currentTickets:
      state.events &&
      state.events.find(data => data.event.id === Number(eventId)).tickets
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(TicketsContainer)
