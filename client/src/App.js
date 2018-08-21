import './App.css'

import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './components/Home'
import EventsContainer from './components/EventsContainer'
import TicketsContainer from './components/TicketsContainer'
import SingleTicketContainer from './components/SingleTicketContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/events" exact component={EventsContainer} />
        <Route path="/events/:eventId/tickets" component={TicketsContainer} />
        <Route path="/tickets/:ticketId" component={SingleTicketContainer} />
      </div>
    )
  }
}

export default App
