import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import styled from 'styled-components'
import { deleteEvent, updateEvent } from '../../store/actions/events'
import {
  CardActionsCentered,
  CardMainSection,
  CardMediaBGIamge,
  DeleteButton,
  StyledCard,
  StyledGridContainer,
  TypographWithColor
} from '../../styles/components/StyledGridContainer'
import { spacing } from '../../styles/styleConstants'
import Pagenation from '../UI/Pagenation'
import TicketFilterInput from '../UI/TicketsFilterInput'
import CreateEventForm from './CreateEventForm'

const MainDiv = styled.div`
  .filter {
    margin: ${spacing.normal}px 0;
  }
`

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
      <MainDiv>
        <Typography variant="display3">Events</Typography>
        <div className="filter">
          <TicketFilterInput />
        </div>
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
      </MainDiv>
    )
  }
}

export default connect(
  null,
  { updateEvent, deleteEvent }
)(Events)
