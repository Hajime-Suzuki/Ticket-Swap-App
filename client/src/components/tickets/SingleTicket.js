import React, { PureComponent } from 'react'
import { calculateFraudRisk } from '../../lib/calculateFraudRisk'
import { formatDate } from '../../lib/formatDateString'
import SellTicketForm from './SellTicketForm'
import { connect } from 'react-redux'
import { updateTicket } from '../../store/actions/tickets'

class SingleTicket extends PureComponent {
  state = {
    showEdit: false,
    ticketData: {}
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateTicket(this.state.ticketData, this.props.ticket.id)
    this.toggleEditForm()
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      ticketData: {
        ...this.state.ticketData,
        [name]: value
      }
    })
  }
  toggleEditForm = () => {
    this.setState(({ showEdit }) => ({
      showEdit: !showEdit
    }))
  }
  render() {
    const { ticket, event, tickets, currentUser } = this.props
    const risk = calculateFraudRisk(ticket, tickets, ticket.user.tickets)

    return (
      <div>
        <p>
          {ticket.user.id} {currentUser.id}
        </p>
        <h1>Ticket from {ticket.user.firstName}</h1>
        <h2>€{ticket.price}</h2>
        <p>for event: {event.name}</p>
        {risk ? <p>risk: {risk}</p> : null}
        <p>desc: {ticket.description}</p>

        <h4>comments</h4>
        {ticket.comments.map(c => {
          return (
            <p key={c.id}>
              {`${c.user.firstName} ${c.user.lastName}`}: {c.content}
              {formatDate(c.createdAt)}
            </p>
          )
        })}
        {ticket.user.id === currentUser.id || currentUser.admin ? (
          <button onClick={this.toggleEditForm}>Edit</button>
        ) : null}

        {this.state.showEdit ? (
          <SellTicketForm
            initial={ticket}
            price={this.state.ticketData.price}
            description={this.state.ticketData.description}
            image={this.state.ticketData.image}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
      </div>
    )
  }
}

export default connect(
  null,
  { updateTicket }
)(SingleTicket)
