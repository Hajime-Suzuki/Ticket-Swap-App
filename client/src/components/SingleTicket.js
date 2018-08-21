import React from 'react'
import { calculateFraudRisk } from '../lib/calculateFraudRisk'

const SingleTicket = ({ ticket, event, tickets, count }) => {
  return (
    <div>
      <h1>Ticket from {ticket.user.firstName}</h1>
      <h2>€{ticket.price}</h2>
      <p>for event: {event.name}</p>
      <p>risk: {calculateFraudRisk(ticket, tickets, count)}</p>
    </div>
  )
}

export default SingleTicket
