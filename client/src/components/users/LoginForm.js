import React, { PureComponent } from 'react'
import { login } from '../../store/actions/users'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { clearErrorMessages } from '../../store/actions/errorMessages'
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
            Password
            <input
              type="password"
              name="password"
              value={this.state.password || ''}
              onChange={this.handleChange}
            />
          </label>

          <button
            type="submit"
            disabled={!this.state.email || !this.state.password}
          >
            Log in
          </button>
        </form>
      </div>
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
