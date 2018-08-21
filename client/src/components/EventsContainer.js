import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../store/actions/events'
import Events from './Events'

class EventsContainer extends Component {
  componentDidMount() {
    if (!this.props.events) this.props.fetchEventsAndRelations()
  }
  render() {
    return this.props.events && <Events events={this.props.events} />
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
