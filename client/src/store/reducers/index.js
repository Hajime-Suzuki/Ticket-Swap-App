import { combineReducers } from 'redux'
import currentUser from './currentUser'
import errorMessages from './errorMessages'
import events from './events'
import pageNum from './pageNum'
import pageTotal from './pageTotal'

export default combineReducers({
  events,
  pageNum,
  currentUser,
  errorMessages,
  pageTotal
})
