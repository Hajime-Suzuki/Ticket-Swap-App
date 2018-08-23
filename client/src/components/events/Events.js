import React from 'react'
import Link from 'react-router-dom/Link'
import { formatDate } from '../../lib/formatDateString'
import TicketFilterInput from '../UI/TicketsFilterInput'
import {
  StyledGridContainer,
  WhiteTypograph,
  TypographWithColor,
  StyledCard,
  CardMediaBGIamge,
  CardMainSection
} from '../../styles/components/StyledGridContainer'
import Pagenation from '../UI/Pagenation'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core'

import styled from 'styled-components'
import { spacing } from '../../styles/styleConstants'

// const CardActionsCentered = styled(CardActions)`
//   display: flex;
//   justify-content: center;
// `
// const CardContentSpaced = styled(CardContent)`
//   margin: 10%;
// `

const Events = ({ events, changePage, pageNum, pageTotal }) => {
  const list = (
    <StyledGridContainer
      container
      direction="row"
      justify="space-evenly"
      alignItems="flex-end"
      spacing={40}
    >
      {events.map(event => {
        return (
          <Grid item key={event.id} xs={11} sm={7} md={5} lg={4} xl={3}>
            <StyledCard>
              <CardMediaBGIamge
                // component="img"
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

                <CardActions>
                  <Button color="primary" variant="contained">
                    <Link to={`/events/${event.id}/tickets`}>
                      <TypographWithColor textcolor="white">
                        See Tickets
                      </TypographWithColor>
                    </Link>
                  </Button>
                </CardActions>
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
    </div>
  )
}

export default Events
