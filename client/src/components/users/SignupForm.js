import React, { PureComponent } from 'react'
import { signup } from '../../store/actions/users'
import { connect } from 'react-redux'
import { clearErrorMessages } from '../../store/actions/errorMessages'
class SignupForm extends PureComponent {
  state = {}

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
      <div className="signup-form">
        {this.props.message ? (
          <p style={{ color: 'red' }}>{this.props.message}</p>
        ) : null}
        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={this.state.email || ''}
              onChange={this.handleChange}
            />
          </label>
          <label>
            First Name
            <input
              type="text"
              name="firstName"
              value={this.state.firstName || ''}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastName"
              value={this.state.lastName || ''}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password || ''}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword || ''}
              onChange={this.handleChange}
            />
          </label>

          {this.state.password &&
            this.state.confirmPassword &&
            this.state.password !== this.state.confirmPassword && (
              <p style={{ color: 'red' }}>The passwords do not match!</p>
            )}

          <button type="submit">Sign up</button>
        </form>
      </div>
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
