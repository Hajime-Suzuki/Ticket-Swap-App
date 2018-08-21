import React from 'react'
import { Link } from 'react-router-dom'
const Tickets = props => {
  return props.tickets.map(ticket => {
    console.log(ticket)

    return (
      <Link to={`/tickets/${ticket.id}`} key={ticket.id}>
        <div>
          <h1>{ticket.user.firstName}</h1>
          <img style={{ width: '30%' }} src={ticket.image} alt="event" />
          <p>{ticket.description}</p>
        </div>
      </Link>
    )
  })
}

export default Tickets
