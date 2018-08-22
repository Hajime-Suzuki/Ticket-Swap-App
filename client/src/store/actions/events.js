import {
  FETCH_EVENTS_AND_RELATIONS,
  FETCH_TOTAL_EVENT_NUMBER
} from '../constants/actionTypes'
import { eventsAxios as axios } from '../../axios/instances'

export const fetchEventsAndRelations = () => async (dispatch, getState) => {
  try {
    console.log('fetch')

    const { events, count } = await axios
      .get('/', {
        params: {
          pageNum: getState().pageNum
        }
      })
      .then(({ data }) => data)

    const transformedData = events.map(data => {
      let { tickets, ...event } = data
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
    dispatch({ type: FETCH_TOTAL_EVENT_NUMBER, payload: count })
  } catch (e) {
    console.log(e)
  }
}
