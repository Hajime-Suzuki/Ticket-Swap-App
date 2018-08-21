import React from 'react'

const Event = props => {
  return props.events.map(event => {
    return (
      <div key={event.id}>
        <h1>{event.name}</h1>
        <img src={event.image} alt="event" />
        <p>{event.description}</p>
      </div>
    )
  })
}

export default Event
