import React from 'react'
import { formatDate } from '../../lib/formatDateString'
import { Typography, Paper, Grid, Divider } from '@material-ui/core'
import styled from 'styled-components'
import { spacing } from '../../styles/styleConstants'

const StyledPaper = styled(Paper)`
  padding: ${spacing.padding.wider} 1em;
  margin: 30px 10px;
  .space {
    margin: 10px 0;
  }
  .date {
    margin-top: 10px;
  }
`

const CommentsList = ({ ticket, margin }) => {
  return (
    <div style={{ marginTop: margin }}>
      <Typography variant="display1">comments</Typography>
      <Grid container justify="center" direction="row">
        {ticket.comments.map(c => {
          return (
            <Grid item xs={11} md={9} lg={4} key={c.id}>
              <StyledPaper>
                <Typography
                  color="primary"
                  children={`${c.user.firstName} ${c.user.lastName}`}
                />
                <Divider className="space" />
                <Typography children={c.content} />
                <Typography variant="caption" className="date">
                  {formatDate(c.createdAt)}
                </Typography>
              </StyledPaper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default CommentsList
