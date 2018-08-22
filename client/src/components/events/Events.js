import React from 'react'
import Link from 'react-router-dom/Link'
import { formatDate } from '../../lib/formatDateString'
import TicketFilterInput from '../tickets/TicketsFilterInput'

const Events = ({ events, changePage, pageNum, pageTotal }) => {
  const list = events.map(event => {
    return (
      <Link to={`/events/${event.id}/tickets`} key={event.id}>
        <div>
          <h4>
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </h4>
          <h1>{event.name}</h1>
          <img style={{ width: '30%' }} src={event.image} alt="event" />
          <p>{event.description}</p>
        </div>
      </Link>
    )
  })

  return (
    <div>
      <TicketFilterInput />
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
