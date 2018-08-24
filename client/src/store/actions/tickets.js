import { ticketsAxios as axios } from '../../axios/instances'
import histroy from '../../lib/history'
import { fetchEventsAndRelations } from './events'
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

export const updateTicket = (ticketData, ticketId) => async (
  dispatch,
  getState
) => {
  try {
    await axios.patch(
      `${ticketId}`,
      { ticketData },
      { headers: { Authorization: getState().currentUser.token } }
    )

    dispatch(fetchEventsAndRelations())
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export const deleteTicket = ticketId => async (dispatch, getState) => {
  try {
    await axios.delete(`${ticketId}`, {
      headers: { Authorization: getState().currentUser.token }
    })

    histroy.replace('/events')
    dispatch(fetchEventsAndRelations())
  } catch (e) {
    console.log(e.response.data.message)
  }
}
