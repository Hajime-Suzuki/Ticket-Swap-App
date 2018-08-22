import React from 'react'
import { Link } from 'react-router-dom'
import { calculateFraudRisk } from '../../lib/calculateFraudRisk'

const TicketsList = ({ tickets, eventId }) => {
  const lists = tickets.map(ticket => {
    const risk = calculateFraudRisk(ticket, tickets, ticket.user.tickets)

    let color
    if (risk < 20) color = 'green'
    else if (risk < 60) color = 'yellow'
    else color = 'red'

    return (
      <Link to={`/tickets/${ticket.id}`} key={ticket.id}>
        <div style={{ backgroundColor: color }}>
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
      <Link to={`/sell/${eventId}`}>Sell a ticket of this event</Link>
      <div>{lists}</div>
    </div>
  )
}

export default TicketsList
