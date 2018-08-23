import styled from 'styled-components'
import { toolbarHeight } from '../styleConstants'
import { Grid } from '@material-ui/core'

export const StyledGridContainer = styled(Grid)`
  && {
    max-width: 100%;
    min-height: calc(100vh - ${toolbarHeight});
    overflow: hidden;
  }
`
