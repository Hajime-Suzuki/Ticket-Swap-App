import React from 'react'
import { Link } from 'react-router-dom'
import { calculateFraudRisk, generateColor } from '../../lib/calculateFraudRisk'
import cloneDeep from 'lodash.clonedeep'
import {
  StyledGridContainer,
  StyledCard,
  CardMediaBGIamge,
  CardMainSection,
  TypographWithColor,
  EventInfo,
  CardActionsCentered
} from '../../styles/components/StyledGridContainer'
import {
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core'
import styled from 'styled-components'
import { formatDate } from '../../lib/formatDateString'
import { spacing } from '../../styles/styleConstants'
import EventInfoHeader from '../events/components/EventInfoHeader'

const Circle = styled.span`
  display: block;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  position: absolute;
  top: 10px;
  left: 10px;
`

const SellButton = styled(Button)`
  && {
    margin-bottom: ${spacing.normal}px;
  }
`

const sortTickets = (tickets, option) => {
  tickets = cloneDeep(tickets)

  if (option.sortType === 'priceAsc') {
    return tickets.sort((a, b) => {
      if (!option.priceAsc) {
        return b.price - a.price
      }
      return a.price - b.price
    })
  } else if (option.sortType === 'authorAsc') {
    return tickets.sort((a, b) => {
      if (a.user.firstName < b.user.firstName) {
        return option.authorAsc ? -1 : 1
      }
      if (a.user.firstName > b.user.firstName) {
        return option.authorAsc ? 1 : -1
      }
      return 0
    })
  } else {
    return tickets
  }
}

const TicketsList = ({
  tickets,
  event,
  sortType,
  authorAsc,
  priceAsc,
  changeSortOption
}) => {
  // console.log(sortTickets(tickets, { sortType, authorAsc, priceAsc }))
  const lists = (
    <StyledGridContainer
      container
      direction="row"
      justify="space-evenly"
      alignItems="flex-end"
      spacing={40}
    >
      {sortTickets(tickets, { sortType, authorAsc, priceAsc }).map(ticket => {
        const risk = calculateFraudRisk(ticket, tickets, ticket.user.tickets)
        const color = generateColor(risk)
        return (
          <Grid item key={ticket.id} xs={11} sm={7} md={5} lg={4} xl={3}>
            <StyledCard>
              <CardMediaBGIamge
                component="div"
                image={ticket.image}
                title={ticket.name}
              />
              <CardMainSection>
                <CardContent>
                  <Typography
                    variant="subheading"
                    children={`${ticket.user.firstName} ${
                      ticket.user.lastName
                    }`}
                  />
                  <Circle color={color} />
                  <Typography
                    gutterBottom
                    variant="display1"
                    component="h1"
                    children={`€${ticket.price}`}
                  />
                  <Typography component="p" children={ticket.description} />
                </CardContent>

                <CardActionsCentered>
                  <Link to={`/tickets/${ticket.id}`} key={ticket.id}>
                    <Button color="primary" variant="contained">
                      <TypographWithColor textcolor="white">
                        See Details
                      </TypographWithColor>
                    </Button>
                  </Link>
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
      <EventInfoHeader event={event} />

      <Link to={`/sell/${event.id}`}>
        <SellButton color="primary" variant="contained">
          <TypographWithColor textcolor="white">Sell Ticket</TypographWithColor>
        </SellButton>
      </Link>

      <div>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => changeSortOption('priceAsc', priceAsc ? false : true)}
        >
          Sort By Price {priceAsc === false ? '↓' : '↑'}
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() =>
            changeSortOption('authorAsc', authorAsc ? false : true)
          }
        >
          Sort By Author {authorAsc === false ? '↓' : '↑'}
        </Button>
      </div>
      <div>{lists}</div>
    </div>
  )
}

export default TicketsList
