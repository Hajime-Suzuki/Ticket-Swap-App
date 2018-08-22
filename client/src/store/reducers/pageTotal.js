import { FETCH_TOTAL_EVENT_NUMBER } from '../constants/actionTypes'

const reducer = (state = 1, { type, payload } = {}) => {
  switch (type) {
    case FETCH_TOTAL_EVENT_NUMBER:
      return payload
    default:
      return state
  }
}

export default reducer
