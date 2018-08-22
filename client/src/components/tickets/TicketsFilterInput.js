import React, { Component } from 'react'
import { filterEvents } from '../../store/actions/events'
import { connect } from 'react-redux'
import 'flatpickr/dist/themes/material_green.css'

import Flatpickr from 'react-flatpickr'

class TicketFilterInput extends Component {
  state = {
    name: '',
    date: new Date()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.filterEvents({ name: this.state.name, date: this.state.date })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  render() {
    const { date } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          filter
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        Ends after:
        <Flatpickr
          value={date}
          onChange={date => {
            this.setState({ date: date[0] })
          }}
          dateFormat="m-d-Y"
        />
        <button>Search</button>
      </form>
    )
  }
}

export default connect(
  null,
  { filterEvents }
)(TicketFilterInput)
