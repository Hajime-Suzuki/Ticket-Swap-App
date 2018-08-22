import { NEXT_PAGE, PREVIOUS_PAGE } from '../constants/actionTypes'
import { fetchEventsAndRelations } from './events'

export const changePage = type => async dispatch => {
  if (type === 'next') {
    dispatch({
      type: NEXT_PAGE
    })
    dispatch(fetchEventsAndRelations())
  } else {
    dispatch({
      type: PREVIOUS_PAGE
    })
    dispatch(fetchEventsAndRelations())
  }
}
