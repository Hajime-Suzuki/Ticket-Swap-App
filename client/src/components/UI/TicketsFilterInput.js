import React, { Component } from 'react'
import { filterEvents } from '../../store/actions/events'
import { connect } from 'react-redux'
import 'flatpickr/dist/themes/material_green.css'

import Flatpickr from 'react-flatpickr'
import { TextField, Button } from '@material-ui/core'

import styled from 'styled-components'

const StyledDatePicker = styled(Flatpickr)`
  border: none;
`

class TicketFilterInput extends Component {
  state = {
    name: '',
    date: new Date()
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('submit')

    this.props.filterEvents({ name: this.state.name, date: this.state.date })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
    // this.props.filterEvents({ name: this.state.name, date: this.state.date })
  }
  render() {
    const { date } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          name="name"
          type="search"
          value={this.state.name}
          onChange={this.handleChange}
        />
        Ends after:
        <StyledDatePicker
          value={date}
          onChange={date => {
            this.setState({ date: date[0] })
          }}
        />
        <Button color="secondary" variant="contained" type="sumbit">
          Search
        </Button>
      </form>
    )
  }
}

export default connect(
  null,
  { filterEvents }
)(TicketFilterInput)
