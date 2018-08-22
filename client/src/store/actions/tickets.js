import { ticketsAxios as axios } from '../../axios/instances'

export const addTicket = (ticketData, eventId) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.post(
      `/${eventId}`,
      { ticketData },
      { headers: { Authorization: getState().currentUser.token } }
    )
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}
