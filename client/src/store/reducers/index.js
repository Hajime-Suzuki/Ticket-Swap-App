import { combineReducers } from 'redux'

import events from './events'
import pageNum from './pageNum'
import currentUser from './currentUser'
import errorMessages from './errorMessages'

export default combineReducers({
  events,
  pageNum,
  currentUser,
  errorMessages
})
