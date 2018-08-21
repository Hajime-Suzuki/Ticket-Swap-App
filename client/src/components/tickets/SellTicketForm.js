import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchEventsAndRelations } from '../../store/actions/events'

class SellTicketForm extends PureComponent {
  state = {}

  componentDidMount() {
    // this.props.clearErrorMessages()
    if (!this.props.currentEvent) {
      this.props.fetchEventsAndRelations()
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)

    // this.props.login(this.state)
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    if (!this.props.currentEvent) return null
    const event = this.props.currentEvent
    return (
      <div>
        {this.props.message ? (
          <p style={{ color: 'red' }}>{this.props.message}</p>
        ) : null}
        <h1>Sell ticket of : {event.name}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Price
            <input
              type="number"
              name="price"
              value={this.state.price || ''}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              type="text"
              name="description"
              value={this.state.description || ''}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Image
            <input
              type="text"
              name="image"
              value={this.state.image || ''}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit" disabled={!this.state.price}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapSateToProps = (state, props) => ({
  currentEvent:
    state.events &&
    state.events
      .map(data => data.event)
      .find(event => event.id === Number(props.match.params.eventId))
})

export default connect(
  mapSateToProps,
  { fetchEventsAndRelations }
)(SellTicketForm)
