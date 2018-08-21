import React from 'react'

const SingleTicket = ({ ticket, event }) => {
  return (
    <div>
      <h1>Ticket from {ticket.user.firstName}</h1>
      <h2>€{ticket.price}</h2>
      <p>for event: {event.name}</p>
    </div>
  )
}

export default SingleTicket
