import { userAxios as axios } from '../../axios/instances'
import { decodeToken } from '../../lib/decodeToken'
import history from '../../lib/history'
import {
  LOGIN_SUCCESS,
  LOG_IN_FAIL,
  LOG_IN_USER,
  LOG_OUT_USER,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCES,
  SIGN_UP_USER
} from '../constants/actionTypes'

export const signup = ({
  email,
  password,
  firstName,
  lastName
}) => async dispatch => {
  try {
    const token = await axios
      .post('/', {
        email,
        firstName,
        lastName,
        password
      })
      .then(({ data }) => data.jwt)

    localStorage.setItem('token', token)
    const decded = decodeToken(token)
    dispatch({
      type: SIGN_UP_USER,
      payload: { token, id: decded.id, admin: decded.admin }
    })
    dispatch({ type: SIGN_UP_SUCCES })
    history.replace('/events')
  } catch (e) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: e.response.data.message
    })
  }
}

export const login = ({ email, password }) => async dispatch => {
  try {
    const token = await axios
      .post('/logins', {
        email,
        password
      })
      .then(({ data }) => data.jwt)

    localStorage.setItem('token', token)

    const decded = decodeToken(token)

    dispatch({
      type: LOG_IN_USER,
      payload: { token, id: decded.id, admin: decded.admin }
    })
    history.replace('/events')
    dispatch({ type: LOGIN_SUCCESS })
  } catch (e) {
    dispatch({
      type: LOG_IN_FAIL,
      payload: e.response.data.message
    })
  }
}

export const logout = () => async dispatch => {
  localStorage.removeItem('token')
  history.replace('/')
  dispatch({
    type: LOG_OUT_USER
  })
}
