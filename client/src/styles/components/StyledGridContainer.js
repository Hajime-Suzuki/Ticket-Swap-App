import styled from 'styled-components'
import { toolbarHeight, spacing } from '../styleConstants'
import { Grid, Typography, Card, CardMedia } from '@material-ui/core'

export const StyledGridContainer = styled(Grid)`
  && {
    max-width: 100%;
    /* min-height: calc(100vh - ${toolbarHeight}); */
    overflow: hidden;
    margin: 0;
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }
`

export const TypographWithColor = styled(Typography)`
  && {
    color: ${({ textcolor }) => textcolor};
  }
`

export const StyledCard = styled(Card)`
  /* margin: ${spacing.padding.normal};
  max-width: 500px; */

`

export const CardMainSection = styled(Card)`
  /* padding: ${spacing.padding.normal} / 2; */
  position: relative 
  button {
    margin: auto;
  }
  div {
    margin: ${spacing.padding.normal} 0;
  }
`

export const CardMediaBGIamge = styled(CardMedia)`
  height: 30vh;
`
