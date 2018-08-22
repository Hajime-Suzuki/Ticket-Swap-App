import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchEventsAndRelations } from '../../store/actions/events'
import { addTicket } from '../../store/actions/tickets'
import { logout } from '../../store/actions/users'

const SellTicketForm = props => {
  // console.log(props.descriptionState === undefined)
  // console.log(props.priceState !== undefined)
  const { initial } = props
  return (
    <div>
      {/* {props.message ? <p style={{ color: 'red' }}>{props.message}</p> : null} */}

      <form onSubmit={props.handleSubmit}>
        <label>
          Price
          <input
            type="number"
            name="price"
            min="0"
            max="999"
            value={
              props.price !== undefined
                ? props.price
                : (initial && initial.price) || ''
            }
            onChange={props.handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            type="text"
            name="description"
            value={
              props.description !== undefined
                ? props.description
                : (initial && initial.description) || ''
            }
            onChange={props.handleChange}
          />
        </label>
        <label>
          Image
          <input
            type="text"
            name="image"
            value={
              props.image !== undefined
                ? props.image
                : (initial && initial.image) || ''
            }
            onChange={props.handleChange}
          />
        </label>

        <button
          type="submit"
          disabled={
            !props.price &&
            (initial && (!props.price && !props.description && !props.image))
          }
        >
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
