import {
  FETCH_EVENTS_AND_RELATIONS,
  FETCH_TOTAL_EVENT_NUMBER
} from '../constants/actionTypes'
import { eventsAxios as axios } from '../../axios/instances'

export const fetchEventsAndRelations = () => async (dispatch, getState) => {
  try {
    console.log('fetch')
    const { data, count } = await getDataAndFormat(
      {
        pageNum: getState().pageNum
      },
      '/'
    )

    dispatch({ type: FETCH_EVENTS_AND_RELATIONS, payload: data })
    dispatch({ type: FETCH_TOTAL_EVENT_NUMBER, payload: count })
  } catch (e) {
    console.log(e)
  }
}

export const filterEvents = ({ name, date }) => async (dispatch, getState) => {
  try {
    const { data } = await getDataAndFormat(
      {
        name,
        date
        // pageNum: getState().pageNum
      },
      '/filter'
    )

    dispatch({ type: FETCH_EVENTS_AND_RELATIONS, payload: data })
    dispatch({ type: FETCH_TOTAL_EVENT_NUMBER, payload: 1 })
  } catch (e) {
    console.log(e.response)
  }
}

const getDataAndFormat = async (params, url) => {
  const { events, count } = await axios
    .get(url, {
      params: {
        ...params
      }
    })
    .then(({ data }) => data)
  console.log(events)
  const transformedData = events.map(data => {
    let { tickets, ...event } = data
    tickets = tickets.map(t => ({ ...t, eventId: event.id }))
    return {
      event,
      tickets
    }
  })

  return { data: transformedData, count }
}
