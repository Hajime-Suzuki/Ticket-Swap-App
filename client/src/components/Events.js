import React from 'react'
import Link from 'react-router-dom/Link'

const Events = props => {
  return props.events.map(event => {
    return (
      <Link to={`/events/${event.id}/tickets`} key={event.id}>
        <div>
          <h1>{event.name}</h1>
          <img style={{ width: '30%' }} src={event.image} alt="event" />
          <p>{event.description}</p>
        </div>
      </Link>
    )
  })
}

export default Events
