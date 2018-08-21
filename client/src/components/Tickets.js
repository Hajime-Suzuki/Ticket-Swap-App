import React from 'react'
import { Link } from 'react-router-dom'
const Tickets = props => {
  return props.events.map(event => {
    return (
      <Link to={`/tickets/${event.id}`} key={event.id}>
        <div>
          <h1>{event.name}</h1>
          <img src="https://fakeimg.pl/350x200/?text=Events" alt="event" />
          <p>{event.description}</p>
        </div>
      </Link>
    )
  })
}

export default Tickets
