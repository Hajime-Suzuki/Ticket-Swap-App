import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { formatDate } from '../../../lib/formatDateString'
import { spacing } from '../../../styles/styleConstants'

export const EventInfo = styled.div`
  margin: ${spacing.normal}px 0;
  .date {
    margin: 10px 0;
  }
`

const EventInfoHeader = ({ event }) => {
  return (
    <EventInfo>
      <Typography variant="display3">{event.name}</Typography>
      <Typography variant="subheading" className="date">
        {formatDate(event.startDate)} - {formatDate(event.endDate)}
      </Typography>
    </EventInfo>
  )
}

export default EventInfoHeader
