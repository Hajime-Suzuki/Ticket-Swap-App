import React from 'react'

import { TextField, Button, Grid } from '@material-ui/core'
import styled from 'styled-components'

const StyledGrid = styled(Grid)`
  && {
    overflow: hidden;
    .input {
      margin-bottom: 3em;
    }
    margin-top: ${({ margin }) => margin}px;
  }
`
function formatDate(date) {
  const now = new Date(date)
  let month = '' + (now.getMonth() + 1)
  let day = '' + now.getDate()
  let year = now.getFullYear()
  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  return [year, month, day].join('-')
}
const CreateEventForm = props => {
  const { initial } = props
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <StyledGrid
          margin={props.margin}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={11} className="input">
            <TextField
              type="text"
              name="name"
              label="Name"
              required
              value={
                props.name !== undefined
                  ? props.name
                  : (initial && initial.name) || ''
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
              required
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
              required
              value={
                props.image !== undefined
                  ? props.image
                  : (initial && initial.image) || ''
              }
              onChange={props.handleChange}
            />
          </Grid>
          <Grid
            container
            item
            xs={11}
            justify="center"
            direction="row"
            className="input"
          >
            <Grid item xs={11} sm={5} md={4} lg={4}>
              <TextField
                className="input"
                label="Start Date"
                type="date"
                name="startDate"
                required
                // inputProps={{
                //   min: minDate
                // }}
                InputLabelProps={{
                  shrink: true
                }}
                value={
                  props.startDate !== undefined
                    ? props.startDate
                    : (initial && formatDate(initial.startDate)) || ''
                }
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={11} sm={5} md={3} lg={2}>
              <TextField
                className="input"
                label="End Date"
                type="date"
                name="endDate"
                required
                InputLabelProps={{
                  shrink: true
                }}
                value={
                  props.endDate !== undefined
                    ? props.endDate
                    : (initial && formatDate(initial.endDate)) || ''
                }
                onChange={props.handleChange}
              />
            </Grid>
          </Grid>

          {!props.noSubmitButton ? (
            <Grid item xs={11} className="input">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={
                  !props.name &&
                  (initial &&
                    (!props.name && !props.description && !props.image))
                }
              >
                Submit
              </Button>
            </Grid>
          ) : null}
        </StyledGrid>
      </form>
    </div>
  )
}

export default CreateEventForm
