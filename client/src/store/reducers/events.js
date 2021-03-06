import { FETCH_EVENTS_AND_RELATIONS } from '../constants/actionTypes'
const reducer = (state = null, { type, payload } = {}) => {
  switch (type) {
    case FETCH_EVENTS_AND_RELATIONS:
      return payload
    default:
      return state
  }
}

export default reducer
