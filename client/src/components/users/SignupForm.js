import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { clearErrorMessages } from '../../store/actions/errorMessages'
import { signup } from '../../store/actions/users'
import { StyledGridContainer } from '../../styles/components/StyledGridContainer'

class SignupForm extends PureComponent {
  state = {
    name: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  }

  componentDidMount() {
    this.props.clearErrorMessages()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.signup(this.state)
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
        <StyledGridContainer
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={40}
        >
          {this.props.message ? (
            <Typography style={{ color: 'red' }}>
              {this.props.message}
            </Typography>
          ) : null}
          <Grid item xs={12}>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              inputProps={{
                pattern: '.{2,}',
                title: 'At leaset 2 characters'
              }}
              required
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              inputProps={{
                pattern: '.{2,}',
                title: 'At leaset 2 characters'
              }}
              required
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              name="email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm password"
              type="password"
              name="confirmPassword"
              required
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </Grid>

          {this.state.password !== this.state.confirmPassword && (
            <Grid item xs={12}>
              <Typography style={{ color: 'red' }}>
                The passwords do not match!
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" color="primary" variant="contained">
              Sign up
            </Button>
          </Grid>
        </StyledGridContainer>
      </form>
    )
  }
}

const mapSateToProps = state => ({
  currentUser: state.currentUser,
  message: state.errorMessages.signup
})

export default connect(
  mapSateToProps,
  { signup, clearErrorMessages }
)(SignupForm)
