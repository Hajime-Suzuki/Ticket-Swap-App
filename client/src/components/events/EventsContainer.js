import React, { Component } from 'react'
import { connect } from 'react-redux'

import Events from './Events'
import { fetchEventsAndRelations } from '../../store/actions/events'

class EventsContainer extends Component {
  componentDidMount() {
    if (!this.props.events) this.props.fetchEventsAndRelations()
  }
  render() {
    return this.props.events ? (
      <Events events={this.props.events} />
    ) : (
      <p>loading...</p>
    )
  }
}
const mapSateToProps = state => {
  return {
    events: state.events && state.events.map(event => event.event)
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(EventsContainer)
