import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../store/actions/events'

import Tickets from './Tickets'

class EventsContainer extends Component {
  componentDidMount() {
    if (!this.props.events) this.props.fetchEventsAndRelations()
  }
  render() {
    return this.props.events && <Tickets events={this.props.events} />
  }
}
const mapSateToProps = state => ({
  events: state.events
})
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(EventsContainer)
