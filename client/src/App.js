import './App.css'

import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './components/Home'
import EventsContainer from './components/events/EventsContainer'
import TicketsListContainer from './components/tickets/TicketsListContainer'
import SingleTicketContainer from './components/tickets/SingleTicketContainer'
import NavigationBar from './components/UI/NavigationBar'
import SignupForm from './components/users/SignupForm'
import LoginForm from './components/users/LoginForm'
import SellTicketForm from './components/tickets/SellTicketForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Route path="/" exact component={Home} />
        <Route path="/events" exact component={EventsContainer} />
        <Route
          path="/events/:eventId/tickets"
          component={TicketsListContainer}
        />
        <Route path="/sell/:eventId" component={SellTicketForm} />
        <Route path="/tickets/:ticketId" component={SingleTicketContainer} />
        <Route path="/signup" exact component={SignupForm} />
        <Route path="/login" exact component={LoginForm} />
      </div>
    )
  }
}

export default App
