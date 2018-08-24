import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { calculateFraudRisk, generateColor } from '../../lib/calculateFraudRisk'
import { deleteTicket, updateTicket } from '../../store/actions/tickets'
import { DeleteButton } from '../../styles/components/StyledGridContainer'
import { spacing } from '../../styles/styleConstants'
import CommentsList from '../comments/CommentsList'
import EventInfoHeader from '../events/components/EventInfoHeader'
import SellTicketForm from './SellTicketForm'

const StyledPaper = styled(Paper)`
  padding: ${spacing.padding.wider} 1em;
  .space {
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
  }
`

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

  deleteTicket = () => {
    this.props.deleteTicket(this.props.ticket.id)
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
        <EventInfoHeader event={event} />
        <Grid container justify="center">
          <Grid item xs={11} md={9} lg={7}>
            <StyledPaper>
              <Typography variant="display1" className="space">
                Seller: {ticket.user.firstName} {ticket.user.lastName}
              </Typography>

              <Typography variant="display1" className="space">
                €{ticket.price}
              </Typography>
              {risk ? (
                <Typography variant="subheading" className="space">
                  risk:{' '}
                  <span style={{ color: generateColor(risk) }}>{risk}%</span>
                </Typography>
              ) : null}
              <Typography className="space">{ticket.description}</Typography>
              <Button className="space" color="primary" variant="contained">
                Check out
              </Button>
            </StyledPaper>
          </Grid>
        </Grid>
        {ticket.comments.length ? (
          <CommentsList
            ticket={ticket}
            currentUser={currentUser}
            margin={spacing.normal}
          />
        ) : null}
        {ticket.user.id === (currentUser && currentUser.id) ||
        (currentUser && currentUser.admin) ? (
          <DeleteButton
            style={{ marginTop: spacing.normal }}
            variant="contained"
            onClick={this.deleteTicket}
          >
            Delete this ticket
          </DeleteButton>
        ) : null}
        {ticket.user.id === (currentUser && currentUser.id) ||
        (currentUser && currentUser.admin) ? (
          <Button
            style={{ marginTop: spacing.normal }}
            color="secondary"
            variant="outlined"
            onClick={this.toggleEditForm}
          >
            Edit this ticket
          </Button>
        ) : null}

        {this.state.showEdit ? (
          <SellTicketForm
            initial={ticket}
            price={this.state.ticketData.price}
            description={this.state.ticketData.description}
            image={this.state.ticketData.image}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            margin={spacing.normal}
          />
        ) : null}
      </div>
    )
  }
}

export default connect(
  null,
  { updateTicket, deleteTicket }
)(SingleTicket)
