import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import CreateEventFormContainer from './components/events/CreateEventFormContainer'
import EventsContainer from './components/events/EventsContainer'
import Home from './components/Home'
import SellTicketFormContainer from './components/tickets/SellTicketFormContainer'
import SingleTicketContainer from './components/tickets/SingleTicketContainer'
import TicketsListContainer from './components/tickets/TicketsListContainer'
import NavigationBar from './components/UI/NavigationBar'
import LoginForm from './components/users/LoginForm'
import SignupForm from './components/users/SignupForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <CssBaseline /> */}
        <NavigationBar />
        <div style={{ padding: '50px 0' }}>
          <Route path="/" exact component={Home} />
          <Route path="/events" exact component={EventsContainer} />
          <Route
            path="/events/create"
            exact
            component={CreateEventFormContainer}
          />
          <Route
            path="/events/:eventId/tickets"
            exact
            component={TicketsListContainer}
          />
          <Route path="/sell/:eventId" component={SellTicketFormContainer} />
          <Route
            path="/tickets/:ticketId"
            exact
            component={SingleTicketContainer}
          />
          <Route path="/signup" exact component={SignupForm} />
          <Route path="/login" exact component={LoginForm} />
        </div>
      </div>
    )
  }
}

export default App
