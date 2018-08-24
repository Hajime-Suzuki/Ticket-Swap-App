import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../../store/actions/events'
import { changePage } from '../../store/actions/pageNum'
import Events from './Events'

class EventsContainer extends Component {
  componentDidMount() {
    if (!this.props.events) this.props.fetchEventsAndRelations()
  }

  render() {
    return this.props.events ? (
      <Events
        events={this.props.events}
        changePage={this.props.changePage}
        pageNum={this.props.pageNum}
        pageTotal={this.props.pageTotal}
        currentUser={this.props.currentUser}
      />
    ) : (
      <p>loading...</p>
    )
  }
}
const mapSateToProps = state => {
  return {
    events: state.events && state.events.map(event => event.event),
    pageNum: state.pageNum,
    pageTotal: state.pageTotal,
    currentUser: state.currentUser
  }
}
export default connect(
  mapSateToProps,
  { fetchEventsAndRelations, changePage }
)(EventsContainer)
