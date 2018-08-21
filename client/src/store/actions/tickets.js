import { ticketsAxios as axios } from '../../axios/tickets'

export const fetchSingleTicket = eventId => async dispatch => {
  try {
    // const { data } = await axios.get(`/${eventId}`)
    // dispatch({ type: FETCH_SINGLE_TICKET, payload: data })
  } catch (e) {
    console.log(e)
  }
}
