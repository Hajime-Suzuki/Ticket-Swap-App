import React, { Component } from 'react'
import { connect } from 'react-redux'
import Events from './Events'
import { fetchSingleTicket } from '../store/actions/tickets'
import { fetchEventsAndRelations } from '../store/actions/events'

class EventsContainer extends Component {
  componentDidMount() {
    if (!this.props.events) {
      fetchEventsAndRelations()
    }
  }
  render() {
    if (!this.props.tickets) return null
    return <Events tickets={this.props.tickets} />
  }
}
const mapSateToProps = state => ({
  events: state.events,
  tickets: state.tickets,
  pageNum: state.pageNum
})
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(EventsContainer)
