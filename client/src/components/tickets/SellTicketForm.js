import React from 'react'

import { TextField, Button, Grid } from '@material-ui/core'
import styled from 'styled-components'

const StyledGrid = styled(Grid)`
  && {
    overflow: hidden;
    .input {
      margin-bottom: 3em;
    }
  }
`
const SellTicketForm = props => {
  // console.log(props.descriptionState === undefined)
  // console.log(props.priceState !== undefined)
  const { initial } = props
  return (
    <div>
      {/* {props.message ? <p style={{ color: 'red' }}>{props.message}</p> : null} */}

      <form onSubmit={props.handleSubmit}>
        <StyledGrid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={11} className="input">
            <TextField
              type="number"
              name="price"
              label="Price"
              inputProps={{
                min: 10,
                max: 999
              }}
              required
              value={
                props.price !== undefined
                  ? props.price
                  : (initial && initial.price) || ''
              }
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={11} className="input">
            <TextField
              type="text"
              name="description"
              label="Description"
              multiline
              value={
                props.description !== undefined
                  ? props.description
                  : (initial && initial.description) || ''
              }
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={11} className="input">
            <TextField
              type="text"
              name="image"
              label="Image URL"
              value={
                props.image !== undefined
                  ? props.image
                  : (initial && initial.image) || ''
              }
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={11} className="input">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={
                !props.price &&
                (initial &&
                  (!props.price && !props.description && !props.image))
              }
            >
              Submit
            </Button>
          </Grid>
        </StyledGrid>
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
