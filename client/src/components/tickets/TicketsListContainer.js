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
    console.log(this.state)

    if (!this.props.currentTickets) return null
    return (
      <TicketsList
        tickets={this.props.currentTickets}
        eventId={this.props.match.params.eventId}
        sortType={this.state.sortType}
        priceAsc={this.state.priceAsc}
        authorAsc={this.state.authorAsc}
        changeSortOption={this.changeSortOption}
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
