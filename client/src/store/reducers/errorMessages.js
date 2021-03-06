import {
  CLEAR_ERROR_MESSAGES,
  LOGIN_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCES
} from '../constants/actionTypes'

const initialState = {
  login: null,
  signup: null
}

const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case SIGN_UP_FAIL:
      return {
        ...state,
        signup: payload
      }
    case SIGN_UP_SUCCES:
      return {
        ...state,
        signup: null
      }
    case LOG_IN_FAIL:
      return {
        ...state,
        login: payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: null
      }

    case CLEAR_ERROR_MESSAGES:
      return initialState
    default:
      return state
  }
}

export default reducer
