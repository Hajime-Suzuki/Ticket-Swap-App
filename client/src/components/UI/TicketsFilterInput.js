import { Button, TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterEvents } from '../../store/actions/events'

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
    return (
      <form onSubmit={this.handleSubmit}>
        <Typography variant="headline">Filter</Typography>
        <TextField
          name="name"
          type="search"
          label="Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <TextField
          className="input"
          label="End Date"
          type="date"
          name="date"
          required
          InputLabelProps={{
            shrink: true
          }}
          onChange={this.handleChange}
        />
        <div style={{ marginTop: '2em' }}>
          <Button color="secondary" variant="contained" type="sumbit">
            Search
          </Button>
        </div>
      </form>
    )
  }
}

export default connect(
  null,
  { filterEvents }
)(TicketFilterInput)
