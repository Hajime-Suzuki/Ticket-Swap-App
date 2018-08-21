import React from 'react'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/users'

const NavigationBar = props => {
  return (
    <div>
      <Link to="/">TOP</Link>
      <Link to="/events">EVENTS</Link>
      {props.currentUser ? null : <Link to="/login">LOGIN</Link>}
      {props.currentUser ? null : <Link to="/signup">SIGN UP</Link>}
      {props.currentUser ? (
        <button onClick={props.logout}>logout</button>
      ) : null}
    </div>
  )
}

const mapSateToProps = state => ({
  currentUser: state.currentUser
})
export default connect(
  mapSateToProps,
  { logout }
)(NavigationBar)
