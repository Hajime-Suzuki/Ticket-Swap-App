import { ticketsAxios as axios } from '../../axios/instances'
import { ADD_TICKET } from '../constants/actionTypes'
import { fetchEventsAndRelations } from './events'
import histroy from '../../lib/history'
export const addTicket = (ticketData, eventId) => async (
  dispatch,
  getState
) => {
  try {
    await axios.post(
      `/${eventId}`,
      { ticketData },
      { headers: { Authorization: getState().currentUser.token } }
    )
    histroy.push('/')
    dispatch(fetchEventsAndRelations())
  } catch (e) {
    console.log(e.response.data)
  }
}
