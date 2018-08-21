import { FETCH_EVENTS_AND_RELATIONS } from '../constants/actionTypes'
import { eventsAxios as axios } from '../../axios/events'

export const fetchEventsAndRelations = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/', {
      params: {
        pageNum: getState().pageNum
      }
    })

    // const separateData = data.map(d => {
    //   const { tickets, ...event } = d
    //   return {
    //     event,
    //     tickets
    //   }
    // })

    // console.log(separateData)

    dispatch({ type: FETCH_EVENTS_AND_RELATIONS, payload: data })
  } catch (e) {
    console.log(e)
  }
}
