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
const CommentForm = props => {
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
              name="content"
              label="comment"
              required
              multiline
              value={
                props.content !== undefined
                  ? props.content
                  : (initial && initial.content) || ''
              }
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={11} className="input">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!props.content && (initial && !props.content)}
            >
              Submit
            </Button>
          </Grid>
        </StyledGrid>
      </form>
    </div>
  )
}

export default CommentForm
