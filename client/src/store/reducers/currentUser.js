import {
  SIGN_UP_USER,
  LOG_IN_USER,
  LOG_OUT_USER
} from '../constants/actionTypes'
import { decodeToken } from '../../lib/decodeToken'

const token = localStorage.getItem('token')
const decoded = token && decodeToken(token)
const initialState = decoded && { token, id: decoded.id }

const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case SIGN_UP_USER:
      return {
        token: payload.token,
        userId: payload.id
      }
    case LOG_IN_USER:
      return {
        token: payload.token,
        userId: payload.id
      }

    case LOG_OUT_USER:
      return null
    default:
      return state
  }
}

export default reducer
