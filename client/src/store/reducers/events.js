import { FETCH_EVENTS } from '../constants/actionTypes'

const reducer = (state = 'events!', { type, payload } = {}) => {
  switch (type) {
    case FETCH_EVENTS:
      return payload
    default:
      return state
  }
}

export default reducer
