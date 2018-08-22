import React from 'react'
import { calculateFraudRisk } from '../../lib/calculateFraudRisk'
import { formatDate } from '../../lib/formatDateString'

const SingleTicket = ({ ticket, event, tickets, currentUserId }) => {
  const risk = calculateFraudRisk(ticket, tickets, ticket.user.tickets)

  return (
    <div>
      <p>
        {ticket.user.id} {currentUserId}
      </p>
      <h1>Ticket from {ticket.user.firstName}</h1>
      <h2>€{ticket.price}</h2>
      <p>for event: {event.name}</p>
      {risk ? <p>risk: {risk}</p> : null}
      {ticket.user.id === currentUserId ? <button>Edit</button> : null}
      <h4>comments</h4>
      {ticket.comments.map(c => {
        return (
          <p key={c.id}>
            {`${c.user.firstName} ${c.user.lastName}`}: {c.content}
            {formatDate(c.createdAt)}
          </p>
        )
      })}
    </div>
  )
}

export default SingleTicket
