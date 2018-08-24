import { eventsAxios as axios } from '../../axios/instances'
import history from '../../lib/history'
import {
  FETCH_EVENTS_AND_RELATIONS,
  FETCH_TOTAL_EVENT_NUMBER
} from '../constants/actionTypes'

export const fetchEventsAndRelations = () => async (dispatch, getState) => {
  try {
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
      },
      '/filter'
    )
    dispatch({ type: FETCH_EVENTS_AND_RELATIONS, payload: data })
    dispatch({ type: FETCH_TOTAL_EVENT_NUMBER, payload: 1 })
  } catch (e) {
    console.log(e.response.data)
  }
}

export const createEvent = eventData => async (dispatch, getState) => {
  try {
    await axios.post('/', eventData, {
      headers: { Authorization: getState().currentUser.token }
    })
    dispatch(fetchEventsAndRelations())
    history.push('/events')
  } catch (e) {
    console.log(e)
  }
}
export const updateEvent = (eventData, eventId) => async (
  dispatch,
  getState
) => {
  try {
    await axios.patch(`/${eventId}`, eventData, {
      headers: { Authorization: getState().currentUser.token }
    })
    dispatch(fetchEventsAndRelations())
  } catch (e) {
    console.log(e)
  }
}
export const deleteEvent = eventId => async (dispatch, getState) => {
  try {
    await axios.delete(`/${eventId}`, {
      headers: { Authorization: getState().currentUser.token }
    })
    dispatch(fetchEventsAndRelations())
  } catch (e) {
    console.log(e.response.data)
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
