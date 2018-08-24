import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'

const Pagenation = ({ pageNum, pageTotal, changePage }) => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={2}>
        {pageNum > 1 ? (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => changePage('prev')}
          >
            Prev
          </Button>
        ) : null}
      </Grid>
      <Grid item xs={2}>
        <Typography>{`${pageNum}/${pageTotal}`}</Typography>
      </Grid>
      <Grid item xs={2}>
        {pageNum < pageTotal ? (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => changePage('next')}
          >
            Next
          </Button>
        ) : null}
      </Grid>
    </Grid>
  )
}

export default Pagenation
