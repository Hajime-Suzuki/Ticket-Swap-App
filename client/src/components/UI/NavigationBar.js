import { Button, Toolbar, Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { darken } from 'polished'
import React from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import styled from 'styled-components'
import { logout } from '../../store/actions/users'
import { transition } from '../../styles/styleConstants'
import { theme } from '../../theme'

const white = theme.palette.white.main

const FlexLogo = styled(Typography)`
  flex-grow: 1;
  text-align: left;
`

const StyledLink = styled(Link)`
  color: ${white};
  transition: ${transition.short};
  &:hover {
    color: ${darken(0.1, white)};
  }
`

const StyledButton = styled(Button)`
  && {
    color: ${white};
    transition: ${transition.short};
    &:hover {
      color: orange;
      background-color: inherit;
    }
  }
`

const NavigationBar = props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <FlexLogo variant="title">
          <StyledLink to="/" transition={transition}>
            TICKET SWAP
          </StyledLink>
        </FlexLogo>

        <Link to="/events">
          <StyledButton variant="flat">EVENTS</StyledButton>
        </Link>
        {props.currentUser ? null : (
          <Link to="/login">
            <StyledButton>LOGIN</StyledButton>
          </Link>
        )}
        {props.currentUser ? null : (
          <Link to="/signup">
            <StyledButton>SIGN UP</StyledButton>
          </Link>
        )}

        {props.currentUser && props.currentUser.admin ? (
          <Link to="/events/create">
            <StyledButton>Create Event</StyledButton>
          </Link>
        ) : null}

        {props.currentUser ? (
          <StyledButton onClick={props.logout}>logout</StyledButton>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

const mapSateToProps = state => ({
  currentUser: state.currentUser
})
export default connect(
  mapSateToProps,
  { logout }
)(NavigationBar)
