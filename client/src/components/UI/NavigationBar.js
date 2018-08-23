import React from 'react'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/users'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, Typography, Button } from '@material-ui/core'
import styled from 'styled-components'
import { darken } from 'polished'

import { theme } from '../../theme'
import { transition } from '../../styles/styleConstants'

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
        {props.currentUser ? (
          <Button onClick={props.logout}>logout</Button>
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
