import { authAxios as axios } from '../axios/instances'
export const checkJWT = async token => {
  try {
    const isAuth = await axios('/', {
      headers: { Authorization: token }
    }).then(({ data }) => data)
    if (isAuth) return true
  } catch (e) {
    return false
  }
}
