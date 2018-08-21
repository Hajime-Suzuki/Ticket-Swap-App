import { FETCH_EVENTS_AND_RELATIONS } from '../constants/actionTypes'
import { eventsAxios as axios } from '../../axios/events'

export const fetchEventsAndRelations = () => async (dispatch, getState) => {
  try {
    console.log('fetch')

    const { data } = await axios.get('/', {
      params: {
        pageNum: getState().pageNum
      }
    })

    const transformedData = data.map(d => {
      let { tickets, ...event } = d
      tickets = tickets.map(t => ({ ...t, eventId: event.id }))
      return {
        event,
        tickets
      }
    })

    // const events = transformedData.reduce((obj, data) => {
    //   obj[data.event.id] = data.event
    //   return obj
    // }, {})

    // const tickets = transformedData.reduce((obj, data) => {
    //   obj[data.event.id] = data.event
    //   return obj
    // }, {})

    // console.log(tickets)

    dispatch({ type: FETCH_EVENTS_AND_RELATIONS, payload: transformedData })
  } catch (e) {
    console.log(e)
  }
}
