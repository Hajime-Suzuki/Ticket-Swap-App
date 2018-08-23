import './App.css'

import { Route, Router } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './components/Home'
import EventsContainer from './components/events/EventsContainer'
import TicketsListContainer from './components/tickets/TicketsListContainer'
import SingleTicketContainer from './components/tickets/SingleTicketContainer'
import NavigationBar from './components/UI/NavigationBar'
import SignupForm from './components/users/SignupForm'
import LoginForm from './components/users/LoginForm'
import SellTicketFormContainer from './components/tickets/SellTicketFormContainer'
import CssBaseline from '@material-ui/core/CssBaseline'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <CssBaseline /> */}
        <NavigationBar />
        <Route path="/" exact component={Home} />
        <Route path="/events" exact component={EventsContainer} />
        <Route
          path="/events/:eventId/tickets"
          component={TicketsListContainer}
        />
        <Route path="/sell/:eventId" component={SellTicketFormContainer} />
        <Route path="/tickets/:ticketId" component={SingleTicketContainer} />
        <Route path="/signup" exact component={SignupForm} />
        <Route path="/login" exact component={LoginForm} />
      </div>
    )
  }
}

export default App
