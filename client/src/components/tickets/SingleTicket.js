import React from 'react'
import { calculateFraudRisk } from '../../lib/calculateFraudRisk'

const SingleTicket = ({ ticket, event, tickets, count, currentUserId }) => {
  const risk = calculateFraudRisk(ticket, tickets, count)

  return (
    <div>
      <h1>Ticket from {ticket.user.firstName}</h1>
      <h2>€{ticket.price}</h2>
      <p>for event: {event.name}</p>
      {risk ? <p>risk: {risk}</p> : null}
      {ticket.user.id === currentUserId ? <button>Edit</button> : null}
    </div>
  )
}

export default SingleTicket
