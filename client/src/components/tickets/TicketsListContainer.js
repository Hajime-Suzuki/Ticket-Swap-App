import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../../store/actions/events'
import TicketsList from './TicketsList'

class TicketsContainer extends Component {
  state = {
    sortType: null,
    priceAsc: null,
    authorAsc: null
  }

  componentDidMount() {
    if (!this.props.currentTickets) this.props.fetchEventsAndRelations()
  }

  changeSortOption = (type, desOrAsc) => {
    this.setState({
      priceAsc: null,
      authorAsc: null,
      sortType: type,
      [type]: desOrAsc
    })
  }

  render() {
    if (!this.props.currentTickets) return null
    return (
      <TicketsList
        tickets={this.props.currentTickets}
        sortType={this.state.sortType}
        priceAsc={this.state.priceAsc}
        authorAsc={this.state.authorAsc}
        changeSortOption={this.changeSortOption}
        event={this.props.currentEvent}
      />
    )
  }
}
const mapSateToProps = (state, props) => {
  const { eventId } = props.match.params
  const currentEventData =
    state.events && state.events.find(data => data.event.id === Number(eventId))

  return {
    currentEvent: currentEventData && currentEventData.event,
    currentTickets: currentEventData && currentEventData.tickets
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(TicketsContainer)
