import { fetchEventsAndRelations } from './events'
import { commentAxios as axios } from '../../axios/instances'

export const updateComment = (commentData, commentId) => async (
  dispatch,
  getState
) => {
  try {
    await axios.patch(`/${commentId}`, commentData, {
      headers: { Authorization: getState().currentUser.token }
    })
    dispatch(fetchEventsAndRelations())
  } catch (e) {
    console.log(e.response.data)
  }
}
export const deleteComment = commentId => async (dispatch, getState) => {
  try {
    await axios.delete(`/${commentId}`, {
      headers: { Authorization: getState().currentUser.token }
    })
    dispatch(fetchEventsAndRelations())
  } catch (e) {
    console.log(e.response.data)
  }
}
