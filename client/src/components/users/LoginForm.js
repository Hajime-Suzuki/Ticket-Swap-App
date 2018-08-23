import React, { PureComponent } from 'react'
import { login } from '../../store/actions/users'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { clearErrorMessages } from '../../store/actions/errorMessages'
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { StyledGridContainer } from '../../styles/components/StyledGridContainer'

class SignupForm extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.clearErrorMessages()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.login(this.state)
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    if (this.props.currentUser) return <Redirect to="/events" />
    return (
      <form onSubmit={this.handleSubmit}>
        <StyledGridContainer
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={40}
        >
          <Grid item xs={12}>
            {this.props.message ? (
              <Typography style={{ color: 'red' }}>
                {this.props.message}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="email"
              name="email"
              type="email"
              required
              value={this.state.email || ''}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="password"
              type="password"
              name="password"
              required
              value={this.state.password || ''}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Log in
            </Button>
          </Grid>
        </StyledGridContainer>
      </form>
    )
  }
}

const mapSateToProps = state => ({
  currentUser: state.currentUser,
  message: state.errorMessages.login
})

export default connect(
  mapSateToProps,
  { login, clearErrorMessages }
)(SignupForm)
