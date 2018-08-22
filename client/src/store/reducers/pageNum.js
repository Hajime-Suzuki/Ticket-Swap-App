import { NEXT_PAGE, PREVIOUS_PAGE } from '../constants/actionTypes'

const reducer = (state = 1, { type, payload } = {}) => {
  switch (type) {
    case NEXT_PAGE:
      return state + 1
    case PREVIOUS_PAGE:
      return state - 1
    default:
      return state
  }
}

export default reducer
