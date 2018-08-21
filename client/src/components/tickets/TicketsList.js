import React from 'react'
import { Link } from 'react-router-dom'

const TicketsList = props => {
  const lists = props.tickets.map(ticket => {
    return (
      <Link to={`/tickets/${ticket.id}`} key={ticket.id}>
        <div>
          <h1>from {ticket.user.firstName}</h1>
          <h2>€{ticket.price}</h2>
          <img style={{ width: '30%' }} src={ticket.image} alt="event" />
          <p>{ticket.description}</p>
        </div>
      </Link>
    )
  })
  return (
    <div>
      <Link to={`/sell/${props.eventId}`}>Sell a ticket of this event</Link>
      <div>{lists}</div>
    </div>
  )
}

export default TicketsList
