import { NEXT_PAGE, PREVIOUS_PAGE } from '../constants/actionTypes'

export const changePage = type => async dispatch => {
  if (type === NEXT_PAGE) {
    dispatch({
      type: NEXT_PAGE
    })
  } else {
    dispatch({
      type: PREVIOUS_PAGE
    })
  }
}
