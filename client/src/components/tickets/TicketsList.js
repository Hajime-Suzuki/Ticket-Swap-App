import React from 'react'
import { Link } from 'react-router-dom'
import { calculateFraudRisk } from '../../lib/calculateFraudRisk'
import cloneDeep from 'lodash.clonedeep'

const sortTickets = (tickets, option) => {
  tickets = cloneDeep(tickets)

  if (option.sortType === 'priceAsc') {
    return tickets.sort((a, b) => {
      if (!option.priceAsc) {
        return b.price - a.price
      }
      return a.price - b.price
    })
  } else if (option.sortType === 'authorAsc') {
    return tickets.sort((a, b) => {
      if (a.user.firstName < b.user.firstName) {
        return option.authorAsc ? -1 : 1
      }
      if (a.user.firstName > b.user.firstName) {
        return option.authorAsc ? 1 : -1
      }
      return 0
    })
  } else {
    return tickets
  }
}

const TicketsList = ({
  tickets,
  eventId,
  sortType,
  authorAsc,
  priceAsc,
  changeSortOption
}) => {
  // console.log(sortTickets(tickets, { sortType, authorAsc, priceAsc }))

  const lists = sortTickets(tickets, { sortType, authorAsc, priceAsc }).map(
    ticket => {
      const risk = calculateFraudRisk(ticket, tickets, ticket.user.tickets)

      let color
      if (risk < 20) color = 'green'
      else if (risk < 60) color = 'yellow'
      else color = 'red'

      return (
        <Link to={`/tickets/${ticket.id}`} key={ticket.id}>
          <div style={{ backgroundColor: color }}>
            <h1>from {ticket.user.firstName}</h1>
            <h2>€{ticket.price}</h2>
            <img style={{ width: '30%' }} src={ticket.image} alt="event" />
            <p>{ticket.description}</p>
          </div>
        </Link>
      )
    }
  )

  // const priceSymbol = priceAsc === null ? '↑' : priceAsc === true ? '↑ ' : '↓'
  return (
    <div>
      <Link to={`/sell/${eventId}`}>Sell a ticket of this event</Link>
      <button
        onClick={() => changeSortOption('priceAsc', priceAsc ? false : true)}
      >
        Sort By Price {priceAsc === false ? '↓' : '↑'}
      </button>
      <button
        onClick={() => changeSortOption('authorAsc', authorAsc ? false : true)}
      >
        Sort By Author {authorAsc === false ? '↓' : '↑'}
      </button>
      <div>{lists}</div>
    </div>
  )
}

export default TicketsList
