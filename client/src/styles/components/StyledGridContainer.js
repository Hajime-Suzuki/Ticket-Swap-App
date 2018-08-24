import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Typography
} from '@material-ui/core'
import { darken } from 'polished'
import styled from 'styled-components'
import { spacing, toolbarHeight } from '../styleConstants'

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
  .button{
    margin: auto ;
  }
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

export const CardActionsCentered = styled(CardActions)`
  display: flex;
  justify-content: center;
`

export const DeleteButton = styled(Button)`
  &&& {
    color: white;
    background-color: #ef5350;
    &:hover {
      background-color: ${darken(0.1, '#ef5350')};
    }
  }
`
