import { decodeToken } from '../../lib/decodeToken'
import {
  LOG_IN_USER,
  LOG_OUT_USER,
  SIGN_UP_USER
} from '../constants/actionTypes'

const token = localStorage.getItem('token')
let initialState = null
if (token) {
  const decoded = decodeToken(token)
  initialState = { token, id: decoded.id, admin: decoded.admin }
}

const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case SIGN_UP_USER:
      return {
        token: payload.token,
        id: payload.id,
        admin: payload.admin
      }
    case LOG_IN_USER:
      return {
        token: payload.token,
        id: payload.id,
        admin: payload.admin
      }
    case LOG_OUT_USER:
      return null
    default:
      return state
  }
}

export default reducer
