import React, { PureComponent } from 'react'
import Link from 'react-router-dom/Link'
import { formatDate } from '../../lib/formatDateString'
import TicketFilterInput from '../UI/TicketsFilterInput'
import { connect } from 'react-redux'
import {
  StyledGridContainer,
  WhiteTypograph,
  TypographWithColor,
  StyledCard,
  CardMediaBGIamge,
  CardMainSection,
  CardActionsCentered,
  DeleteButton
} from '../../styles/components/StyledGridContainer'
import Pagenation from '../UI/Pagenation'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText
} from '@material-ui/core'

import styled from 'styled-components'
import { spacing } from '../../styles/styleConstants'
import CreateEventForm from './CreateEventForm'
import { updateEvent, deleteEvent } from '../../store/actions/events'

class Events extends PureComponent {
  state = {
    showEdit: false,
    eventData: {},
    selectedEvent: null
  }

  handleSubmit = type => {
    if (type === 'delete') {
      this.props.deleteEvent(this.state.selectedEvent.id)
    } else {
      this.props.updateEvent(this.state.eventData, this.state.selectedEvent.id)
    }
    this.toggleDialog()
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      eventData: {
        ...this.state.eventData,
        [name]: value
      }
    })
  }

  toggleDialog = event => {
    if (this.state.showEdit) {
      this.setState({ showEdit: false, selectedEvent: null })
    } else {
      this.setState({ showEdit: true, selectedEvent: event })
    }
  }

  render() {
    const { events, changePage, pageNum, pageTotal, currentUser } = this.props
    const list = (
      <StyledGridContainer
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
        spacing={40}
      >
        {events.map(event => {
          return (
            <Grid item key={event.id} xs={11} sm={7} md={5} lg={4} xl={3}>
              <StyledCard>
                <CardMediaBGIamge
                  component="div"
                  image={event.image}
                  title={event.name}
                />
                <CardMainSection>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="display1"
                      component="h1"
                      children={event.name}
                    />
                    <Typography component="p" children={event.description} />
                  </CardContent>

                  <CardActionsCentered>
                    <Link to={`/events/${event.id}/tickets`}>
                      <Button color="primary" variant="contained">
                        <TypographWithColor textcolor="white">
                          See Tickets
                        </TypographWithColor>
                      </Button>
                    </Link>
                    {currentUser && currentUser.admin ? (
                      <Button onClick={() => this.toggleDialog(event)}>
                        Edit Event
                      </Button>
                    ) : null}
                  </CardActionsCentered>
                </CardMainSection>
              </StyledCard>
            </Grid>
          )
        })}
      </StyledGridContainer>
    )

    return (
      <div>
        <TicketFilterInput />
        {list}
        <Pagenation
          pageNum={pageNum}
          pageTotal={pageTotal}
          changePage={changePage}
        />

        <Dialog
          fullWidth
          open={this.state.showEdit}
          onClose={this.toggleDialog}
        >
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            <CreateEventForm
              initial={this.state.selectedEvent}
              name={this.state.eventData.name}
              description={this.state.eventData.description}
              image={this.state.eventData.image}
              startDate={this.state.eventData.startDate}
              endDate={this.state.eventData.endDate}
              handleChange={this.handleChange}
              noSubmitButton
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleSubmit('edit')}
              color="primary"
              disabled={
                !this.state.eventData.name &&
                !this.state.eventData.description &&
                !this.state.eventData.image &&
                !this.state.eventData.startDate &&
                !this.state.eventData.endDate
              }
            >
              Submit
            </Button>
            <DeleteButton onClick={() => this.handleSubmit('delete')}>
              Delete
            </DeleteButton>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default connect(
  null,
  { updateEvent, deleteEvent }
)(Events)
