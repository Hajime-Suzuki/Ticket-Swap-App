import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../../store/actions/events'
import { addTicket } from '../../store/actions/tickets'
import { logout } from '../../store/actions/users'

const SellTicketForm = props => {
  const { event } = props
  if (!event) return null

  return (
    <div>
      {/* {props.message ? <p style={{ color: 'red' }}>{props.message}</p> : null} */}

      <form onSubmit={props.handleSubmit}>
        <label>
          Price
          <input
            type="number"
            name="price"
            value={props.price || ''}
            onChange={props.handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            type="text"
            name="description"
            value={props.description || ''}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Image
          <input
            type="text"
            name="image"
            value={props.image || ''}
            onChange={props.handleChange}
          />
        </label>

        <button type="submit" disabled={!props.price}>
          Submit
        </button>
      </form>
    </div>
  )
}

// const mapSateToProps = (state, props) => ({
//   currentEvent:
//     state.events &&
//     state.events
//       .map(data => data.event)
//       .find(event => event.id === Number(props.match.params.eventId)),
//   currentUser: state.currentUser
// })

export default SellTicketForm
