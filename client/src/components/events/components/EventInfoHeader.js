import React from 'react'
import { Typography } from '@material-ui/core'
import { formatDate } from '../../../lib/formatDateString'
import styled from 'styled-components'
import { spacing } from '../../../styles/styleConstants'
import { TypographWithColor } from '../../../styles/components/StyledGridContainer'

export const EventInfo = styled.div`
  && {
    margin: ${spacing.normal}px 0;
    padding: 10% 0;
    background-image: url(${({ img }) => img});
    background-size: cover;
    background-position: center;
    .date {
      margin: 10px 0;
    }
    .white {
      color: white;
    }
  }
`

const EventInfoHeader = ({ event }) => {
  return (
    <EventInfo img={event.image}>
      <Typography className="white" variant="display3">
        {event.name}
      </Typography>
      <Typography className="white date" variant="subheading">
        {formatDate(event.startDate)} - {formatDate(event.endDate)}
      </Typography>
      <Typography className="white date" variant="subheading">
        {event.description}
      </Typography>
    </EventInfo>
  )
}

export default EventInfoHeader
