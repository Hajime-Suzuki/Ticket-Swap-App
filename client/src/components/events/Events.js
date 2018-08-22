import React from 'react'
import Link from 'react-router-dom/Link'

const Events = ({ events, changePage, pageNum, pageTotal }) => {
  const list = events.map(event => {
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

  return (
    <div>
      {list}
      {pageNum > 1 ? (
        <button onClick={() => changePage('prev')}>Prev</button>
      ) : null}
      {pageNum < pageTotal ? (
        <button onClick={() => changePage('next')}>Next</button>
      ) : null}
    </div>
  )
}

export default Events
